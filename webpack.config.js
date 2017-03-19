const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require('path');
const ExtractTextPlugin =  require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['*', '.js', '.json']
    },
    devtool: 'inline-source-map',
    entry: {
        index: './src/client/index/styles.scss',
        searchResults: './src/client/searchResults/styles.scss'
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/',
        filename: '[name]-bundle.js'
    },
    plugins: [

        new webpack.LoaderOptionsPlugin({
            minimize: false,
            debug: true,
            noInfo: true, // set to false to see a list of every file being bundled.
            options: {
                sassLoader: {
                    includePaths: [path.resolve(__dirname, 'src', 'scss')]
                },
                context: '/',
                postcss: () => [autoprefixer]
            }
        }),

        new ExtractTextPlugin('[name].css'),

        new webpack.optimize.UglifyJsPlugin({
            minimize: false,
            compress: {
                warnings: false
            }
        }),

        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3002,
            proxy: 'localhost:3000'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/, exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader'},
            {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
            {test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'},
            {test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=[name].[ext]'},
            {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'},
            {test: /(\.css|\.scss|\.sass)$/, loader: ExtractTextPlugin.extract('css-loader?sourceMap!postcss-loader!sass-loader?sourceMap')}
        ]
    }
};