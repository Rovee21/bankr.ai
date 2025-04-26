/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
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
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
    ],
  }
  