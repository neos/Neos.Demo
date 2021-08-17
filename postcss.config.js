module.exports = {
    plugins: {
        'postcss-focus': true,
        'postcss-sort-media-queries': true,
        autoprefixer: {
            grid: true
        },
        cssnano: {
            preset: ['default', { discardComments: { removeAll: true } }]
        },
        'postcss-reporter': {
            clearReportedMessages: true
        }
    }
};
