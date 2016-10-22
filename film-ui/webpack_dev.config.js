var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var chalk = require('chalk');

module.exports = {
    devtool: 'eval',
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ProgressBarPlugin({
            format: '  Build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
            clear: false
        }),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
            }
        }),
        new webpack.LoaderOptionsPlugin({
            test: /\.(less|css)$/,
            options: {
                postcss: function () {
                    return [ autoprefixer ];
                }
            }
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
        moduleExtensions: ["-loader"],
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel', 'eslint'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.(less|css)$/,
                loaders: [
                    'style-loader',
                    {
                        loader: 'css',
                        query: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName : '[path][name]---[local]---[hash:base64:5]'
                        }
                    },
                    'less',
                    'postcss'
                ]
            },
            {
                test: /\.(otf|eot|ttf|ttc|woff|jpe?g|png|gif)/,
                loaders: [{ loader: 'url', query: { limit: 24000 }}]
            },
            {
                test: /\.svg/,
                loaders: [{ loader: 'url', query: { limit: 24000, mimetype: 'image/svg+xml' }}]
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    }
};