const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['Resources/Private/Fusion/**/*.{fusion,js,ts}', 'NodeTypes/**/*.{fusion,js,ts}'],
    theme: {
        extend: {
            minHeight: defaultTheme.spacing,
            colors: {
                light: 'rgb(var(--color-light) / <alpha-value>)',
                dark: 'rgb(var(--color-dark) / <alpha-value>)',
            },
            fontFamily: {
                sans: ['Work Sans', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/line-clamp'),
        plugin(({ addVariant, addUtilities }) => {
            // Add not empty variants
            addVariant('not-empty', ['&:not(:empty)']);
            addVariant('group-not-empty', ['.group:not(:empty) ~ &']);
            addVariant('peer-not-empty', ['.peer:not(:empty) ~ &']);

            // Add hover and focus combi
            addVariant('hocus', ['&:hover', '&:focus']);
            addVariant('group-hocus', ['.group:hover &', '.group:focus &']);
            addVariant('peer-hocus', ['.peer:hover ~ &', '.peer:focus ~ &']);

            // Add combi hover and focus-within
            addVariant('hocus-within', ['&:hover', '&:focus-within']);
            addVariant('group-hocus-within', ['.group:hover &', '.group:focus-within &']);
            addVariant('peer-hocus-within', ['.peer:hover ~ &', '.peer:focus-within ~ &']);

            // Add children variant
            addVariant('children', '& > *');

            // Support variants
            addVariant(
                'supports-backdrop-blur',
                '@supports (backdrop-filter: blur(0)) or (-webkit-backdrop-filter: blur(0))'
            );
            addVariant('supports-scrollbars', '@supports selector(::-webkit-scrollbar)');

            // Add scrollbar variants
            addVariant('scrollbar', '&::-webkit-scrollbar');
            addVariant('scrollbar-track', '&::-webkit-scrollbar-track');
            addVariant('scrollbar-thumb', '&::-webkit-scrollbar-thumb');

            addUtilities({
                '.hide-scrollbar': {
                    '-ms-overflow-style': 'none', // for Internet Explorer, Edge
                    'scrollbar-width': 'none', // for Firefox
                    '&::-webkit-scrollbar': {
                        display: 'none', // for Chrome, Safari, and Opera
                    },
                },
            });
        }),
    ],
};
