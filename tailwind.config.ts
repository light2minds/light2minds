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
          200: '#A8C7ED',
          100: '#D6E4F7',
          50:  '#EBF2FB',
        },
        forest: {
          900: '#0F2A1D',
          800: '#174232',
          700: '#2B7A52',
          600: '#3A9E6A',
          500: '#4DBF80',
          400: '#74D19B',
          200: '#B6E8CE',
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
        sage: {
          900: '#1d3329',
          800: '#2d5040',
          700: '#3f7060',
          600: '#518f78',
          500: '#64af92',
          400: '#84c8ac',
          300: '#aadac1',
          200: '#c8ecd9',
          100: '#e3f5ec',
          50:  '#f1faf6',
        },
        warm: {
          900: '#431407',
          800: '#7c2d12',
          700: '#9a3412',
          600: '#c2410c',
          500: '#ea580c',
          400: '#fb923c',
          300: '#fdba74',
          200: '#fed7aa',
          100: '#ffedd5',
          50:  '#fff7ed',
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
