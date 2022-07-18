module.exports = (ctx) => ({
    map: ctx.options.map,
    plugins: {
        'postcss-easy-import': {
            extensions: ['.pcss', '.css'],
        },
        'postcss-sort-media-queries': true,
        autoprefixer: true,
        cssnano: {
            preset: ['default', { discardComments: { removeAll: true } }],
        },
        'postcss-reporter': {
            clearReportedMessages: true,
        },
    },
});
