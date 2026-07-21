/**
 * KropiQ — canonical design tokens.
 *
 * Reconciles the 13 Stitch page themes into one system built on the official
 * brand sheet: #FF3D00 orange, #2B3440 graphite, #FFFFFF white, Inter, 4px/8px radii.
 * Compiled once to assets/css/kropiq.css — the shipped site loads plain CSS.
 */
const INTER = ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'];

module.exports = {
  content: ['./*.html', './assets/js/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // --- brand core (strict) ---
        'brand-orange': '#FF3D00',
        'brand-graphite': '#2B3440',

        primary: '#FF3D00',
        'on-primary': '#FFFFFF',
        'primary-container': '#FF3D00',
        'on-primary-container': '#FFFFFF',
        'surface-tint': '#FF3D00',
        'inverse-primary': '#FFB49B',

        // --- neutral ladder: white-dominant, graphite-tinted ---
        background: '#FFFFFF',
        'on-background': '#2B3440',
        surface: '#FFFFFF',
        'on-surface': '#2B3440',
        'surface-bright': '#FFFFFF',
        'surface-dim': '#E2E5E8',
        'surface-container-lowest': '#FAFAFA',
        'surface-container-low': '#F5F6F7',
        'surface-container': '#F0F1F2',
        'surface-container-high': '#E9EBED',
        'surface-container-highest': '#E2E5E8',
        'surface-variant': '#F0F1F2',
        'on-surface-variant': '#5A6472',
        outline: '#C9CDD2',
        'outline-variant': '#E4E7EA',
        'inverse-surface': '#2B3440',
        'inverse-on-surface': '#FFFFFF',

        // --- secondary = muted graphite (body copy, metadata) ---
        secondary: '#5A6472',
        'on-secondary': '#FFFFFF',
        'secondary-container': '#F0F1F2',
        'on-secondary-container': '#2B3440',

        // --- tertiary folded into graphite (brand forbids extra hues) ---
        tertiary: '#2B3440',
        'on-tertiary': '#FFFFFF',
        'tertiary-container': '#EEF0F2',
        'on-tertiary-container': '#2B3440',

        // --- functional ---
        error: '#BA1A1A',
        'on-error': '#FFFFFF',
        'error-container': '#FFDAD6',
        'on-error-container': '#93000A',

        // --- fixed pairs ---
        'primary-fixed': '#FFE2D8',
        'primary-fixed-dim': '#FFB49B',
        'on-primary-fixed': '#4A1400',
        'on-primary-fixed-variant': '#B32A00',
        'secondary-fixed': '#F0F1F2',
        'secondary-fixed-dim': '#D5D9DE',
        'on-secondary-fixed': '#2B3440',
        'on-secondary-fixed-variant': '#5A6472',
        'tertiary-fixed': '#EEF0F2',
        'tertiary-fixed-dim': '#D5D9DE',
        'on-tertiary-fixed': '#2B3440',
        'on-tertiary-fixed-variant': '#5A6472',
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
        sans: INTER,
        'h1-desktop': INTER,
        'h1-mobile': INTER,
        h2: INTER,
        h3: INTER,
        'display-lg': INTER,
        'display-lg-mobile': INTER,
        'headline-lg': INTER,
        'headline-md': INTER,
        'body-lg': INTER,
        'body-md': INTER,
        'label-md': INTER,
        'label-sm': INTER,
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
        'level-1': '0 4px 6px -1px rgba(43, 52, 64, 0.08), 0 2px 4px -1px rgba(43, 52, 64, 0.04)',
        'level-2': '0 12px 24px -4px rgba(43, 52, 64, 0.12), 0 4px 6px -2px rgba(43, 52, 64, 0.06)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/container-queries')],
};
