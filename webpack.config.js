const packages = require('./webpack.packages');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const GlobImporter = require('node-sass-glob-importer');
const TerserPlugin = require('terser-webpack-plugin');

function config(
    {
        filename = 'Main.js',
        entryPath = 'Resources/Private/Fusion',
        publicPath = 'Resources/Public',
        hasSourceMap = true
    },
    argv
) {
    const includePaths = ['node_modules'];
    const isInlineAsset = publicPath == 'Resources/Private/Templates/InlineAssets';
    const baseFilename = filename.substring(0, filename.lastIndexOf('.'));
    const isProduction = argv.mode == 'production';
    hasSourceMap = isInlineAsset ? false : hasSourceMap;

    return {
        mode: isProduction ? 'production' : 'development',
        devtool: hasSourceMap ? (isProduction ? 'source-map' : 'nosources-source-map') : false,
        stats: {
            modules: false,
            hash: false,
            version: false,
            timings: true,
            chunks: false,
            children: false,
            source: false,
            publicPath: false
        },
        performance: { hints: false },
        entry: {
            [path.join(entryPath, filename)]: './' + path.join(entryPath, filename)
        },
        output: {
            devtoolModuleFilenameTemplate: isProduction
                ? 'webpack://[namespace]/[resource-path]?[loaders]'
                : 'file://[absolute-resource-path]?[loaders]',
            path: path.resolve(__dirname, publicPath),
            filename: path.join(isInlineAsset ? '' : 'Scripts', `${baseFilename}.js`)
        },
        optimization: isProduction
            ? {
                  minimizer: [
                      new TerserPlugin({
                          cache: true,
                          parallel: true,
                          sourceMap: hasSourceMap
                      })
                  ]
              }
            : {},
        plugins: [
            new MiniCssExtractPlugin({
                filename: path.join(isInlineAsset ? '' : 'Styles', `${baseFilename}.css`)
            })
        ],
        context: path.resolve(__dirname),
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                },
                {
                    // do not test for css to prevent double builds
                    // when two packages depend on another
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                sourceMap: isInlineAsset ? false : hasSourceMap,
                                importLoaders: 2
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: isInlineAsset ? false : hasSourceMap
                            }
                        },
                        {
                            loader: 'sass-loader',

                            options: {
                                sourceMap: isInlineAsset ? false : hasSourceMap,
                                // absolute paths for SCSS
                                sassOptions: {
                                    importer: GlobImporter(),
                                    includePaths: includePaths
                                }
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.scss']
        }
    };
}

module.exports = (env, argv) => packages.map(setting => config(setting, argv));
