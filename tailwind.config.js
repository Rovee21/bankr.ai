/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#031e38',
            light: '#0a2e52',
            dark: '#020f1c',
          },
          accent: {
            DEFAULT: '#e5c156',
            light: '#f0d480',
            dark: '#c9a53d',
          },
          blue: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
          },
          gray: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
          },
        },
        boxShadow: {
          'neu-up': '8px 8px 16px #020f1c, -8px -8px 16px #042d55',
          'neu-down': 'inset 8px 8px 16px #020f1c, inset -8px -8px 16px #042d55',
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
    ],
  }
  