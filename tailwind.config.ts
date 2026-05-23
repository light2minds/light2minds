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
        // Primary dark base — professional foundation
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
        // Brand green — from logo "Minds"
        forest: {
          900: '#0D3A1C',
          800: '#165C2C',
          700: '#1A8838',
          600: '#22AA45',
          500: '#2EBB50',  // logo green
          400: '#52CC6E',
          300: '#84DC97',
          200: '#B8ECCA',
          100: '#DBF5E3',
          50:  '#EDFAF1',
        },
        // Brand yellow — from logo "2" and sunburst
        gold: {
          600: '#C8A800',
          500: '#E5C800',
          400: '#FFE030',  // logo yellow
          300: '#FFE866',
          200: '#FFF3AA',
          100: '#FFF9D6',
          50:  '#FFFCE8',
        },
        // Brand sky blue — from logo "Light"
        sky: {
          700: '#1A7AC0',
          600: '#2A9EE0',
          500: '#3FB5F5',
          400: '#5BC4F8',  // logo sky blue
          300: '#87D4FA',
          200: '#BBE8FD',
          100: '#DDF4FE',
          50:  '#EFF9FF',
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
