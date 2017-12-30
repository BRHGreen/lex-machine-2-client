// using node's inbuild ability to recognise paths
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // all of our development takes place here
    entry: './src/index.js',
    // everything we do will be compiled into bundle.js
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    watch: true,
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: [/\.scss$/, /\.css$/],
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }
        ],
        loaders: [
            {
                query: {
                    presets: ['stage-0', 'react']
                }
            }
        ]
    }
}
