const colors = require('tailwindcss/colors')

module.exports = {
  prefix: 'tw-',
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  safelist: [
    ...[].concat(
      ...[1, 2, 3, 4, 5, 6, 8, 10, 12].map((s) =>
        ['', 'x', 'y', 't', 'b', 'l', 'r'].map((c) => `tw-p${c}-${s}`)
      )
    ),
    ...[].concat(
      ...[1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64].map((s) =>
        ['w', 'h'].map((c) => `tw-${c}-${s}`)
      )
    ),
    ...[200, 300, 400, 500, 600, 700, 800].map((n) => `tw-text-primary-${n}`),
    ...[200, 300, 400, 500, 600, 700, 800].map((n) => `tw-text-secondary-${n}`),
    'tw-w-1/2',
    'tw-w-1/3',
    'tw-w-2/3',
    'tw-w-1/4',
    'tw-w-2/4',
    'tw-w-3/4',
    'tw-w-1/5',
    'tw-w-2/5',
    'tw-w-3/5',
    'tw-w-4/5',
    'tw-w-1/6',
    'tw-w-2/6',
    'tw-w-3/6',
    'tw-w-4/6',
    'tw-w-5/6',
    'tw-w-1/12',
    'tw-w-2/12',
    'tw-w-3/12',
    'tw-w-4/12',
    'tw-w-5/12',
    'tw-w-6/12',
    'tw-w-7/12',
    'tw-w-8/12',
    'tw-w-9/12',
    'tw-w-10/12',
    'tw-w-11/12',
  ],
  theme: {
    colors: {
      primary: colors.blue,
      secondary: colors.purple,
      neutral: colors.gray,
      error: colors.red,
      white: colors.white,
      black: colors.black,
      yellow: colors.yellow,
      transparent: 'transparent',
      current: 'currentColor',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    minWidth: {
      0: '0',
      '1/5': '20%',
      '1/4': '25%',
      '1/3': '33.33333%',
      '2/5': '40%',
      '1/2': '50%',
      '3/5': '60%',
      '3/4': '75%',
      '4/5': '80%',
      full: '100%',
    },
    extend: {},
  },
  variants: {},
  plugins: [],
}
