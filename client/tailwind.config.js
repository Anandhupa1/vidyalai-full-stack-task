module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  daisyui: {
    themes: [ "dark"],
  },
  theme: {
    extend: {
      maxWidth: {
        'md': '32rem', 
      },
      animation: {
                'spin-fast': 'spin 0.5s linear infinite',
       },
      colors: {
        neonBlue: '#4D4DFF',
        customYellow: '#FFD369',
      },
      backdropFilter: {
        'none': 'none',
        'sm': 'blur(4px)',
        'md': 'blur(8px)',
        'lg': 'blur(16px)',
        // ... add other blur values if you like
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require("daisyui"),
  ],
}

