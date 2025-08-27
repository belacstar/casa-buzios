const theme = require('./src/theme'); // Use require para CommonJS

/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: theme.colors.primary,
                secondary: theme.colors.secondary,
                background: theme.colors.background,
                accent: theme.colors.accent,
                textPrimary: theme.colors.textPrimary,
                textSecondary: theme.colors.textSecondary,
            },
        },
    },
    plugins: [],
};
