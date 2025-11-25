/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    important: true,
    theme: {
        extend: {
            colors: {
                'primary-blue': '#3b82f6',
                'primary-orange': '#f97316',
                'dark-blue': '#1e40af',
                'light-blue': '#60a5fa',
                'dark-orange': '#ea580c',
                'light-orange': '#fb923c',
            },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false, // Disable Tailwind's base styles to avoid conflicts with Angular Material
    },
}
