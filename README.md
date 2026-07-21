# KropiQ — static website

Plain HTML, CSS and JavaScript. No Vite, no React, no build step, no CDN.
Open `index.html` in a browser, or drop the whole folder on any web host.

## Structure

```
index.html            Home — hand-authored landing page (not generated from Stitch)
programs.html         Career-transformation landing page
courses.html          Course catalogue (live filtering + sorting)
program-detail.html   Single programme page
about.html            About us
resources.html        Resources & blog
pricing.html          Pricing & plans
business.html         KropiQ for business / enterprise
ai-tutor.html         AI tutor chat (focused app view, own chrome)
contact.html          Contact & support (validated form)
profile.html          Student profile
assignments.html      Assignments & projects
certificates.html     Certificates & achievements

assets/css/kropiq.css Compiled stylesheet — the only stylesheet
assets/js/main.js     All behaviour, one file, no dependencies
assets/img/           Logo lockups, favicon, photography
```

Every page shares the same header and footer, so a nav change means editing the
same block in each file (or scripting it).

## Design tokens

Built on the official KropiQ brand sheet:

| Token | Value | Use |
| --- | --- | --- |
| Brand orange | `#FF3D00` | CTAs, active states, accents (~10%) |
| Slate gray | `#2B3440` | Headings, body text, nav (~30%) |
| White | `#FFFFFF` | Backgrounds and surfaces (~60%) |
| Black | `#000000` | Site footer and the AI-tutor feature band |
| Typeface | Inter | 56/36/24/16/14 px scale |
| Radius | 4px standard, 8px large, pill for tags | |

The 13 source designs each carried a slightly different auto-generated palette
and radius scale; they were reconciled into this single system so the pages look
like one site.

## JavaScript

`assets/js/main.js` is vanilla ES2017 and every module guards on the markup it
needs, so the one file is safe to load everywhere:

- **Mobile nav** — hamburger drawer, Escape to close, auto-closes past 1024px.
- **Header elevation** — shadow appears once the page scrolls.
- **Course filters** (`courses.html`) — category / duration / partner filters
  (OR within a group, AND across groups), sorting, live result count, empty
  state, "Clear All". Filtering starts on first interaction so the page ships in
  its designed state.
- **AI tutor** (`ai-tutor.html`) — self-contained chat demo with canned replies.
  No network calls. User input is inserted as text, never HTML.
- **Contact form** (`contact.html`) — required-field and email validation with
  an inline confirmation. There is no backend; wire `submit` to your endpoint.
- **Scroll reveals and stat counters** (`index.html`) — sections fade in on
  entry and the stat tiles count up once. Both respect
  `prefers-reduced-motion`, and the reveal styles are scoped to `.js` so
  content is never hidden if scripting is unavailable.

## Known issue: orange contrast

`#FF3D00` on white measures **3.55:1**, and white on `#FF3D00` is the same.
That clears WCAG AA for large text (3:1) but not for normal-size text (4.5:1),
so small orange links, eyebrow labels and the 14px bold button text fall short.
Options: darken small orange text to about `#C22E00` (5.7:1) while keeping
`#FF3D00` for fills, or raise button text to 16px semibold.

## Rebuilding the stylesheet

`assets/css/kropiq.css` is pre-compiled and committed — you do **not** need
Node to run or edit the site. Only if you want to change design tokens or add
new utility classes:

```sh
npm install tailwindcss@3.4.17 @tailwindcss/forms @tailwindcss/container-queries
npx tailwindcss -c tailwind.config.js -i input.css -o assets/css/kropiq.css
```

`tailwind.config.js` and `input.css` hold the tokens and the small amount of
hand-written CSS (icon font, nav drawer, accordions).

## Fonts and icons

Inter and Material Symbols load from Google Fonts. To make the site fully
offline, download both and swap the `<link>` tags in each page's `<head>` for
local `@font-face` rules.
