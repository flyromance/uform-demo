const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

const UFORM_ENV = process.env.UFORM_ENV || 'local';
const NODE_ENV =
    process.env.NODE_ENV === 'production' ? 'production' : 'development';
const isProd = NODE_ENV === 'production';

const config = {
    entry: ['./src/main.js'],
    output: {
        path: path.resolve('dist/assets'),
        filename: isProd ? 'js/[name].js' : 'js/[name].[hash:8].js',
        publicPath: '/', // 默认是''
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    isProd
                        ? {
                              loader: MiniCssExtractPlugin.loader,
                              options: {
                                  // you can specify a publicPath here
                                  // by default it use publicPath in webpackOptions.output
                                  // publicPath: '../'
                              },
                          }
                        : {
                              loader: 'style-loader',
                          },
                    {
                        loader: 'css-loader',
                        options: {},
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            MY_UFORM_ENV: UFORM_ENV,
        }),
        new HtmlWebpackPlugin({
            template: './src/template.html',
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: isProd ? 'css/[name].[hash:8].css' : 'css/[name].css',
            chunkFilename: isProd ? 'css/[id].[hash:8].css' : 'css/[id].css',
        }),
    ],
};

if (isProd) {
    config.mode = 'production';
    config.optimization = {
        minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin({})],
    };
} else {
    config.mode = 'development';
    config.devServer = {
        historyApiFallback: true,
        publicPath: '/', // 默认是'/'
        host: '0.0.0.0',
        proxy: {
            '/ev': {
                target: 'http://evboe.bytedance.net',
                changeOrigin: true,
            },
            '/admin': {
                target: 'http://evboe.bytedance.net',
                changeOrigin: true,
            }
        }
    };
}

module.exports = config;
