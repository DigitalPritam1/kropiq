/**
 * KropiQ — canonical design tokens.
 *
 * Reconciles the 13 Stitch page themes into one system built on the Kropiq
 * brand refresh: #5D2E56 deep mauve (primary identity), #FF7A12 orange (accent
 * only), #F6ECD8 warm beige (surfaces), Noto Sans, 4px/8px radii.
 * Compiled once to assets/css/kropiq.css — the shipped site loads plain CSS.
 */
// One family across both scripts: Noto Sans for Latin, Noto Sans Devanagari for Hindi.
const NOTO = ['Noto Sans', 'Noto Sans Devanagari', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Arial', 'sans-serif'];

module.exports = {
  content: ['./*.html', './assets/js/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // --- brand core ---
        // Deep mauve is the identity; orange is a supporting accent only.
        'brand-mauve': '#5D2E56',
        'brand-mauve-dark': '#4A2645', // stats bar, footer, AI-tutor band
        'brand-orange': '#FF7A12',     // accent: CTAs, hover, key metrics
        'brand-cream': '#F6ECD8',      // warm beige surface
        // brand-graphite is repointed to mauve so every heading and hairline
        // border that referenced it becomes mauve without markup changes.
        'brand-graphite': '#5D2E56',

        // primary = mauve identity (headings, links, nav, icons)
        primary: '#5D2E56',
        'on-primary': '#FFFFFF',
        'primary-container': '#FF7A12', // solid attention fills that read as CTA
        'on-primary-container': '#FFFFFF',
        'surface-tint': '#5D2E56',
        'inverse-primary': '#E6CFE0',

        // --- warm neutral ladder: beige page, off-white cards ---
        background: '#F6ECD8',
        'on-background': '#2B2430',
        surface: '#FCFAF6',
        'on-surface': '#2B2430',
        'surface-bright': '#FFFFFF',
        'surface-dim': '#ECE0C8',
        'surface-container-lowest': '#FCFAF6',
        'surface-container-low': '#F1E7D2',
        'surface-container': '#EFE3CC',
        'surface-container-high': '#EADDC4',
        'surface-container-highest': '#E5D7BC',
        'surface-variant': '#EFE3CC',
        'on-surface-variant': '#6B6672',
        outline: '#C7B7A2',
        'outline-variant': '#E3D6BE',
        'inverse-surface': '#4A2645',
        'inverse-on-surface': '#F6ECD8',

        // --- secondary = warm plum-grey body copy / metadata ---
        secondary: '#574F5C',
        'on-secondary': '#FFFFFF',
        'secondary-container': '#EFE3CC',
        'on-secondary-container': '#2B2430',

        // --- tertiary folded into mauve (single identity hue) ---
        tertiary: '#5D2E56',
        'on-tertiary': '#FFFFFF',
        'tertiary-container': '#F1E7D2',
        'on-tertiary-container': '#2B2430',

        // --- functional ---
        error: '#BA1A1A',
        'on-error': '#FFFFFF',
        'error-container': '#FFDAD6',
        'on-error-container': '#93000A',

        // --- fixed pairs (warm mauve family) ---
        'primary-fixed': '#F0DFEA',
        'primary-fixed-dim': '#CBA9C3',
        'on-primary-fixed': '#261022',
        'on-primary-fixed-variant': '#7A4270',
        'secondary-fixed': '#EFE3CC',
        'secondary-fixed-dim': '#D8CBB4',
        'on-secondary-fixed': '#2B2430',
        'on-secondary-fixed-variant': '#574F5C',
        'tertiary-fixed': '#F1E7D2',
        'tertiary-fixed-dim': '#D8CBB4',
        'on-tertiary-fixed': '#2B2430',
        'on-tertiary-fixed-variant': '#574F5C',
      },

      // Brand shape language: 4px standard, 8px hero containers, pill for tags.
      borderRadius: {
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },

      spacing: {
        unit: '4px',
        'unit-xs': '4px',
        'unit-sm': '8px',
        'unit-md': '16px',
        'unit-lg': '24px',
        'unit-xl': '48px',
        'unit-2xl': '80px',
        xs: '8px',
        sm: '16px',
        md: '24px',
        lg: '32px',
        xl: '48px',
        margin: '24px',
        gutter: '24px',
        'margin-mobile': '20px',
        'margin-desktop': '64px',
        'container-max': '1280px',
      },

      fontFamily: {
        sans: NOTO,
        'h1-desktop': NOTO,
        'h1-mobile': NOTO,
        h2: NOTO,
        h3: NOTO,
        'display-lg': NOTO,
        'display-lg-mobile': NOTO,
        'headline-lg': NOTO,
        'headline-md': NOTO,
        'body-lg': NOTO,
        'body-md': NOTO,
        'label-md': NOTO,
        'label-sm': NOTO,
      },

      fontSize: {
        'h1-desktop': ['56px', { lineHeight: '64px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h1-mobile': ['36px', { lineHeight: '44px', letterSpacing: '-0.01em', fontWeight: '700' }],
        h2: ['36px', { lineHeight: '44px', letterSpacing: '-0.01em', fontWeight: '600' }],
        h3: ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'display-lg': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg-mobile': ['32px', { lineHeight: '40px', fontWeight: '700' }],
        'headline-lg': ['32px', { lineHeight: '40px', fontWeight: '600' }],
        'headline-md': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'label-md': ['14px', { lineHeight: '20px', letterSpacing: '0.01em', fontWeight: '500' }],
        'label-sm': ['14px', { lineHeight: '20px', letterSpacing: '0.05em', fontWeight: '500' }],
      },

      maxWidth: {
        'container-max': '1280px',
      },

      boxShadow: {
        'level-1': '0 8px 24px -6px rgba(93, 46, 86, 0.10), 0 2px 6px -2px rgba(93, 46, 86, 0.06)',
        'level-2': '0 18px 45px -8px rgba(93, 46, 86, 0.14), 0 6px 14px -4px rgba(93, 46, 86, 0.08)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/container-queries')],
};
