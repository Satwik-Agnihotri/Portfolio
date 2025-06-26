// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    // Ensure these paths cover all your React components, e.g., if you have
    // components in an 'app' directory or 'pages' directory.
    // Example:
    // './pages/**/*.{js,ts,jsx,tsx,mdx}',
    // './components/**/*.{js,ts,jsx,tsx,mdx}',
    // './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Existing animation (fadeIn)
      animation: {
        fadeIn: 'fadeIn 0.4s ease-out',
        // Add custom animation utilities for the gradient border
        'gradient-border-anim': 'gradient-move 2s ease-in-out forwards',
        'gradient-border-anim-loop': 'gradient-move 2s ease-in-out infinite',
      },
      // Existing keyframes (fadeIn)
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Add custom keyframes for the gradient border
        'gradient-move': {
          '0%': {
            'background-position': '0% 100%', // Bottom-left
          },
          '50%': {
            'background-position': '100% 0%', // Top-right
          },
          '100%': {
            'background-position': '100% 0%', // Stay at top-right
          },
        },
      },
      // Correct placement for custom font family
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};