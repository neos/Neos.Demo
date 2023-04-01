const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

function getFontSettings(theme, fontSize, fontWeight = 400) {
    return {
        fontSize: theme(`fontSize.${fontSize}`)[0],
        lineHeight: theme(`fontSize.${fontSize}`)[1].lineHeight,
        letterSpacing: theme(`fontSize.${fontSize}`)[1].letterSpacing,
        fontWeight,
    };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['Resources/Private/Fusion/**/*.{fusion,js,ts}', 'NodeTypes/**/*.{fusion,js,ts}'],
    theme: {
        extend: {
            minHeight: defaultTheme.spacing,
            maxWidth: (theme) => ({
                'screen-md-p': `calc(${theme('screens.md')} + ${theme('spacing.16')})`,
                'screen-lg-p': `calc(${theme('screens.lg')} + ${theme('spacing.16')})`,
                'screen-xl-p': `calc(${theme('screens.xl')} + ${theme('spacing.16')})`,
                'screen-2xl-p': `calc(${theme('screens.2xl')} + ${theme('spacing.16')})`,
                'screen-3xl-p': `calc(${theme('screens.3xl')} + ${theme('spacing.16')})`,
            }),
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
                        letterSpacing: defaultTheme.letterSpacing.tighter,
                    },
                ],
                '6xl': [
                    '3.75rem',
                    {
                        lineHeight: '1',
                        letterSpacing: defaultTheme.letterSpacing.tighter,
                    },
                ],
                '7xl': [
                    '4.5rem',
                    {
                        lineHeight: '1',
                        letterSpacing: defaultTheme.letterSpacing.tighter,
                    },
                ],
                '8xl': [
                    '6rem',
                    {
                        lineHeight: '1',
                        letterSpacing: defaultTheme.letterSpacing.tighter,
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
            ringColor: {
                DEFAULT: 'rgb(var(--color-light))',
            },
            fontFamily: {
                sans: ['Work Sans', ...defaultTheme.fontFamily.sans],
            },
            typography: (theme) => ({
                white: {
                    css: {
                        '--tw-prose-body': colors.white,
                        '--tw-prose-headings': colors.white,
                        '--tw-prose-lead': colors.white,
                        '--tw-prose-links': colors.white,
                        '--tw-prose-bold': colors.white,
                        '--tw-prose-counters': colors.white,
                        '--tw-prose-bullets': colors.white,
                        '--tw-prose-hr': colors.white,
                        '--tw-prose-quotes': colors.white,
                        '--tw-prose-quote-borders': colors.white,
                        '--tw-prose-captions': colors.white,
                        '--tw-prose-code': colors.white,
                        '--tw-prose-pre-code': colors.white,
                        '--tw-prose-pre-bg': colors.white,
                        '--tw-prose-th-borders': colors.white,
                        '--tw-prose-td-borders': colors.white,

                        a: {
                            textDecoration: 'underline',
                            '&:hover': {
                                textDecoration: 'none',
                            },
                            '&:focus': {
                                textDecoration: 'none',
                            },
                        },
                    },
                },
                DEFAULT: {
                    css: {
                        '--tw-prose-links': 'var(--color-light)',
                        '--tw-prose-bullets': 'rgb(var(--color-light)/50%)',
                        maxWidth: null,
                        h1: getFontSettings(theme, '5xl'),
                        h2: getFontSettings(theme, '4xl'),
                        h3: getFontSettings(theme, '3xl'),
                        h4: getFontSettings(theme, '2xl'),
                        h5: getFontSettings(theme, 'xl'),
                        h6: getFontSettings(theme, 'lg'),
                        'h1 + h2': {
                            marginTop: '0',
                        },
                        a: {
                            color: 'rgb(var(--tw-prose-links))',
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                            '&:focus': {
                                textDecoration: 'underline',
                            },
                        },
                    },
                },
            }),
        },
    },
    plugins: [
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
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

            // Add first letter in first paragraph variant
            addVariant('first-letter-in-text', '& > p:first-of-type:first-letter');

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
                '.dropcap': {
                    'font-size': defaultTheme.fontSize['7xl'],
                    'font-family': defaultTheme.fontFamily.serif,
                    float: 'left',
                    margin: `0 ${defaultTheme.spacing['4']} -${defaultTheme.spacing['2']} 0`,
                    'line-height': '1',
                },
            });

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
