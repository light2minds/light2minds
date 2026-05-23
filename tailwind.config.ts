import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      colors: {
        navy: {
          950: '#060C16',
          900: '#0D1B2E',
          800: '#122340',
          700: '#1A3358',
          600: '#1B4F8F',
          500: '#2A64BC',
          400: '#5B8DD9',
          100: '#D6E4F7',
          50:  '#EBF2FB',
        },
        forest: {
          900: '#0F2A1D',
          800: '#174232',
          700: '#2B7A52',
          600: '#3A9E6A',
          500: '#4DBF80',
          100: '#D4EFE1',
          50:  '#EAF7EF',
        },
        gold: {
          600: '#B8900E',
          500: '#CF9F10',
          400: '#E8B84B',
          300: '#F0CC70',
          200: '#F7E4A8',
          100: '#FBF3D8',
          50:  '#FEFCF0',
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
}

export default config
