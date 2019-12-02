module.exports = {
    plugins: {
        'postcss-assets': {
            cachebuster: false,
            basePath: 'DistributionPackages/',
            baseUrl: '/_Resources/Static/Packages',
            loadPaths: ['**/Resources/Public/**/*']
        },
        'postcss-url': {
            filter: /\/_Resources\/Static\/Packages\/[\w]+\.[\w]+\/Resources\/Public\/.*/,
            url: asset => asset.url.replace('/Resources/Public/', '/')
        },
        'postcss-normalize': {
            allowDuplicates: false,
            forceImport: false
        },
        'postcss-preset-env': {
            stage: 1,
            autoprefixer: false
        },
        'postcss-easing-gradients': {
            colorStops: 15,
            alphaDecimals: 5,
            colorMode: 'lrgb'
        },
        'postcss-vmax': true,
        'postcss-clip-path-polyfill': true,
        'postcss-responsive-type': true,
        'postcss-easings': true,
        'postcss-focus': true,
        'pleeease-filters': true,
        'postcss-quantity-queries': true,
        'postcss-momentum-scrolling': ['scroll', 'auto', 'inherit'],
        'postcss-flexbugs-fixes': true,
        'postcss-calc': true,
        'postcss-round-subpixels': true,
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
