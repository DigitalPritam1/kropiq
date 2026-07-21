/**
 * KropiQ — site behaviour.
 *
 * Plain ES2017, no build step, no dependencies. Every module below guards on the
 * markup it needs, so this one file is safe to load on all pages.
 */
(function () {
  'use strict';

  var on = function (el, evt, fn) { if (el) el.addEventListener(evt, fn); };
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------------------------------------------------------------- nav --- */

  function mobileNav() {
    var toggle = $('[data-nav-toggle]');
    var drawer = $('#mobile-nav');
    if (!toggle || !drawer) return;

    var icon = $('.material-symbols-outlined', toggle);
    var setOpen = function (open) {
      drawer.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (icon) icon.textContent = open ? 'close' : 'menu';
    };

    on(toggle, 'click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Close on Escape, and when the viewport grows past the mobile breakpoint.
    on(document, 'keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
    on(window, 'resize', function () {
      if (window.innerWidth >= 1024) setOpen(false);
    });
  }

  /** Lift the sticky header once the page scrolls away from the top. */
  function headerElevation() {
    var header = $('header.sticky');
    if (!header) return;
    var apply = function () {
      header.classList.toggle('shadow-level-1', window.scrollY > 8);
    };
    apply();
    on(window, 'scroll', apply, { passive: true });
  }

  /* ------------------------------------------------------ course filters --- */

  /** Courses page: live filtering, sorting and result count over the card grid. */
  function courseFilters() {
    var cards = $$('a[href="program-detail.html"]')
      .map(function (a) { return a.closest('.h-full.group'); })
      .filter(function (c, i, all) { return c && all.indexOf(c) === i; });
    if (cards.length < 2) return;

    var grid = cards[0].parentElement;
    var boxes = $$('input[type="checkbox"]').filter(function (b) { return b.closest('label'); });
    if (!boxes.length) return;

    // Each checkbox belongs to the filter group named by the nearest heading above it.
    var groupOf = function (box) {
      var block = box.closest('label').parentElement.parentElement;
      var heading = $('h4', block);
      return heading ? heading.textContent.trim().toLowerCase() : '';
    };
    var labelOf = function (box) {
      return box.closest('label').textContent.replace(/\(\d+\)/, '').trim();
    };

    var monthsOf = function (card) {
      var m = card.textContent.match(/(\d+)\s*Months?/i);
      return m ? parseInt(m[1], 10) : null;
    };
    var inDurationBucket = function (card, bucket) {
      var n = monthsOf(card);
      if (n === null) return false;
      if (/^0\s*-\s*3/.test(bucket)) return n <= 3;
      if (/^3\s*-\s*6/.test(bucket)) return n > 3 && n <= 6;
      if (/^6\s*-\s*12/.test(bucket)) return n > 6 && n <= 12;
      if (/^12\+/.test(bucket)) return n >= 12;
      return false;
    };

    var priceOf = function (card) {
      var m = card.textContent.replace(/,/g, '').match(/₹\s*(\d+)/);
      return m ? parseInt(m[1], 10) : Number.MAX_SAFE_INTEGER;
    };

    var countEl = $$('p').filter(function (p) { return /^Showing\b/.test(p.textContent.trim()); })[0];
    var sortEl = $$('select').filter(function (s) { return /Newest/i.test(s.textContent); })[0];
    var clearBtn = $$('button').filter(function (b) { return b.textContent.trim() === 'Clear All'; })[0];

    var order = cards.slice();

    // Shown only once a filter combination matches nothing.
    var empty = document.createElement('p');
    empty.className = 'font-body-lg text-body-lg text-secondary py-unit-xl text-center col-span-full';
    empty.setAttribute('role', 'status');
    empty.textContent = 'No programmes match these filters yet. Try widening your selection.';

    function apply() {
      var selected = {};
      boxes.filter(function (b) { return b.checked; }).forEach(function (b) {
        var g = groupOf(b);
        (selected[g] = selected[g] || []).push(labelOf(b));
      });

      var shown = 0;
      cards.forEach(function (card) {
        var text = card.textContent.toLowerCase();
        var ok = Object.keys(selected).every(function (g) {
          return selected[g].some(function (val) {
            if (/duration/.test(g)) return inDurationBucket(card, val);
            return text.indexOf(val.toLowerCase()) !== -1;
          });
        });
        card.hidden = !ok;
        card.style.display = ok ? '' : 'none';
        if (ok) shown++;
      });

      if (countEl) {
        var chosen = [].concat.apply([], Object.keys(selected).map(function (g) { return selected[g]; }));
        countEl.textContent = 'Showing ' + shown + ' result' + (shown === 1 ? '' : 's') +
          (chosen.length ? ' for "' + chosen.join('", "') + '"' : '');
      }

      if (shown === 0) grid.appendChild(empty);
      else if (empty.parentElement) empty.remove();
    }

    function sort() {
      if (!sortEl) return;
      var mode = sortEl.value || sortEl.options[sortEl.selectedIndex].textContent;
      var list = order.slice();
      if (/price/i.test(mode)) list.sort(function (a, b) { return priceOf(a) - priceOf(b); });
      else if (/duration/i.test(mode)) list.sort(function (a, b) { return (monthsOf(a) || 0) - (monthsOf(b) || 0); });
      list.forEach(function (c) { grid.appendChild(c); });
    }

    boxes.forEach(function (b) { on(b, 'change', apply); });
    on(sortEl, 'change', function () { sort(); apply(); });
    on(clearBtn, 'click', function (e) {
      e.preventDefault();
      boxes.forEach(function (b) { b.checked = false; });
      apply();
    });

    // Deliberately no initial apply(): the page ships in its designed state
    // (all programmes visible) and filtering starts on the first interaction.
  }

  /* ---------------------------------------------------------- ai tutor --- */

  /** AI Tutor: a self-contained conversational demo (no network calls). */
  function aiTutor() {
    var chat = $('#chat-container');
    var input = $('textarea');
    if (!chat || !input) return;

    var sendBtn = $$('button').filter(function (b) {
      var icon = $('.material-symbols-outlined', b);
      return icon && /send|arrow_upward/.test(icon.textContent.trim());
    })[0] || $$('button.bg-primary').pop();

    var now = function () {
      return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    };

    function el(tag, className, text) {
      var node = document.createElement(tag);
      node.className = className;
      if (text != null) node.textContent = text; // never innerHTML: input stays inert
      return node;
    }

    function bubble(role, text) {
      var ai = role === 'ai';

      var wrap = el('div', 'flex items-start gap-4 max-w-[85%]' + (ai ? '' : ' self-end flex-row-reverse'));
      var avatar = el('div', 'w-8 h-8 rounded-full ' + (ai ? 'bg-primary' : 'bg-secondary-container') +
        ' flex items-center justify-center shrink-0 mt-1');
      avatar.appendChild(el('span', 'material-symbols-outlined ' +
        (ai ? 'text-on-primary' : 'text-on-secondary-container') + ' text-[18px]', ai ? 'smart_toy' : 'person'));

      var column = el('div', 'flex flex-col gap-2' + (ai ? '' : ' items-end'));
      column.appendChild(el('div', (ai
        ? 'bg-surface-container-low border border-surface-variant rounded-2xl rounded-tl-sm text-on-surface'
        : 'bg-primary text-on-primary rounded-2xl rounded-tr-sm shadow-md') +
        ' p-4 font-body-md text-body-md', text));
      column.appendChild(el('span', 'font-label-sm text-label-sm text-secondary text-xs ' +
        (ai ? 'ml-1' : 'mr-1'), now()));

      wrap.appendChild(avatar);
      wrap.appendChild(column);
      chat.appendChild(wrap);
      chat.scrollTop = chat.scrollHeight;
      return wrap;
    }

    var REPLIES = [
      'Based on the Zone A telemetry, a pulse schedule of three 12-minute cycles spaced four hours apart should hold moisture in the active root zone without deep percolation.',
      'Good question. The Penman-Monteith reference evapotranspiration for your location today is 5.2 mm — so the crop coefficient at this growth stage puts actual demand near 4.1 mm.',
      'I can break that down further. Sandy loam holds roughly 120 mm of available water per metre of depth, so your 40 cm root zone gives you about 48 mm of usable storage.',
      "Let's check that against the module material — section 4.3 covers exactly this trade-off between frequency and duration.",
    ];
    var replyIndex = 0;

    function thinking() {
      var wrap = el('div', 'flex items-start gap-4 max-w-[85%]');
      var avatar = el('div', 'w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1');
      avatar.appendChild(el('span', 'material-symbols-outlined text-on-primary text-[18px]', 'smart_toy'));
      wrap.appendChild(avatar);
      wrap.appendChild(el('div', 'bg-surface-container-low border border-surface-variant rounded-2xl ' +
        'rounded-tl-sm p-4 font-body-md text-body-md text-secondary', 'Analysing…'));
      chat.appendChild(wrap);
      chat.scrollTop = chat.scrollHeight;
      return wrap;
    }

    function send(text) {
      text = (text || '').trim();
      if (!text) return;
      bubble('user', text);
      input.value = '';
      input.style.height = '';
      var pending = thinking();
      setTimeout(function () {
        pending.remove();
        bubble('ai', REPLIES[replyIndex % REPLIES.length]);
        replyIndex++;
      }, 900);
    }

    on(sendBtn, 'click', function (e) { e.preventDefault(); send(input.value); });
    on(input, 'keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        send(input.value);
      }
    });

    // Suggested-question chips prefill and send.
    $$('button').forEach(function (b) {
      if (!/rounded-full/.test(b.className)) return;
      var text = b.textContent.trim();
      if (!text || text.length > 60) return;
      on(b, 'click', function (e) { e.preventDefault(); send(text); });
    });
  }

  /* -------------------------------------------------------------- forms --- */

  /** Contact form: client-side validation plus an inline confirmation. */
  function contactForm() {
    var form = $('form');
    if (!form) return;

    on(form, 'submit', function (e) {
      e.preventDefault();

      var fields = $$('input, textarea', form).filter(function (f) { return f.type !== 'hidden'; });
      var firstBad = null;

      fields.forEach(function (f) {
        var bad = !f.value.trim() || (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value));
        f.classList.toggle('border-error', bad);
        f.setAttribute('aria-invalid', String(bad));
        if (bad && !firstBad) firstBad = f;
      });

      if (firstBad) {
        firstBad.focus();
        return;
      }

      var done = document.createElement('p');
      done.className = 'font-body-md text-body-md text-on-primary bg-brand-orange rounded p-unit-md mt-unit-md';
      done.setAttribute('role', 'status');
      done.textContent = 'Thanks — your request has been recorded. The KropiQ team will reply within one working day.';

      var prev = $('[role="status"]', form);
      if (prev) prev.remove();
      form.appendChild(done);
      fields.forEach(function (f) { f.value = ''; });
    });
  }

  /* ------------------------------------------------------------ motion --- */

  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** Fade sections in as they enter the viewport. */
  function scrollReveal() {
    var items = $$('.reveal');
    if (!items.length) return;

    if (reducedMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        // Stagger siblings slightly so grids cascade rather than pop as one block.
        var siblings = Array.prototype.slice.call(entry.target.parentElement.children);
        var delay = Math.min(siblings.indexOf(entry.target), 5) * 70;
        setTimeout(function () { entry.target.classList.add('is-visible'); }, delay);
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    items.forEach(function (el) { io.observe(el); });
  }

  /** Count stat tiles up to their target the first time they are seen. */
  function statCounters() {
    var stats = $$('[data-count-to]');
    if (!stats.length) return;

    var format = function (n) { return n.toLocaleString('en-US'); };

    var run = function (el) {
      var target = parseFloat(el.getAttribute('data-count-to'));
      var suffix = el.getAttribute('data-count-suffix') || '';
      if (isNaN(target)) return;

      if (reducedMotion) {
        el.textContent = format(target) + suffix;
        return;
      }

      var started = null;
      var duration = 1400;
      var step = function (now) {
        if (started === null) started = now;
        var p = Math.min((now - started) / duration, 1);
        // ease-out cubic
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = format(Math.round(target * eased)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if (!('IntersectionObserver' in window)) {
      stats.forEach(run);
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        run(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.5 });

    stats.forEach(function (el) { io.observe(el); });
  }

  /* --------------------------------------------------------------- init --- */

  function init() {
    mobileNav();
    headerElevation();
    scrollReveal();
    statCounters();
    courseFilters();
    aiTutor();
    contactForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
