const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['Resources/Private/Fusion/**/*.{fusion,js,ts}', 'NodeTypes/**/*.{fusion,js,ts}'],
    theme: {
        extend: {
            minHeight: defaultTheme.spacing,
            fontSize: {
                lg: [
                    '1.125rem',
                    {
                        lineHeight: '1.75rem',
                        letterSpacing: defaultTheme.letterSpacing.tight,
                    },
                ],
                xl: [
                    '1.25rem',
                    {
                        lineHeight: '1.75rem',
                        letterSpacing: defaultTheme.letterSpacing.tight,
                    },
                ],
                '2xl': [
                    '1.5rem',
                    {
                        lineHeight: '2rem',
                        letterSpacing: defaultTheme.letterSpacing.tight,
                    },
                ],
                '3xl': [
                    '1.875rem',
                    {
                        lineHeight: '2.25rem',
                        letterSpacing: defaultTheme.letterSpacing.tighter,
                    },
                ],
                '4xl': [
                    '2.25rem',
                    {
                        lineHeight: '2.5rem',
                        letterSpacing: defaultTheme.letterSpacing.tighter,
                    },
                ],
                '5xl': [
                    '3rem',
                    {
                        lineHeight: '1',
                        letterSpacing: '-0.1em',
                    },
                ],
                '6xl': [
                    '3.75rem',
                    {
                        lineHeight: '1',
                        letterSpacing: '-0.1em',
                    },
                ],
                '7xl': [
                    '4.5rem',
                    {
                        lineHeight: '1',
                        letterSpacing: '-0.1em',
                    },
                ],
                '8xl': [
                    '6rem',
                    {
                        lineHeight: '1',
                        letterSpacing: '-0.1em',
                    },
                ],
                '9xl': [
                    '8rem',
                    {
                        lineHeight: '1',
                        letterSpacing: defaultTheme.letterSpacing.tighter,
                    },
                ],
            },
            colors: {
                light: 'rgb(var(--color-light) / <alpha-value>)',
                dark: 'rgb(var(--color-dark) / <alpha-value>)',
            },
            fontFamily: {
                sans: ['Work Sans', ...defaultTheme.fontFamily.sans],
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        color: null,
                        strong: {
                            fontWeight: '800',
                        },
                        a: null,
                        'a:not([class])': {
                            color: theme('colors.main.light'),
                            textDecoration: 'underline',
                            '&:hover': {
                                color: theme('colors.main.dark'),
                                textDecoration: 'none',
                            },
                            '&:focus': {
                                color: theme('colors.main.dark'),
                                textDecoration: 'none',
                            },
                        },
                        'ol > li::before': {
                            color: theme('colors.main.light'),
                        },
                        'ul > li::before': {
                            backgroundColor: theme('colors.main.light'),
                        },
                        blockquote: {
                            borderLeftColor: theme('colors.main.light'),
                        },
                        h5: {
                            color: theme('colors.gray.900'),
                            fontWeight: '600',
                            textDecoration: 'underline',
                        },
                        h6: {
                            color: theme('colors.gray.900'),
                            fontWeight: '400',
                            textDecoration: 'underline',
                        },
                    },
                },
            }),
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
