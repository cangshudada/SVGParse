
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require('path');
const package = require("../package.json");

module.exports = {
    entry: path.resolve(__dirname, '../src/index.ts'),
    output: {
        filename: 'path2poly.js',
        path: path.resolve(__dirname, '../dist'),
        libraryExport: "default",
        library: "path2poly",
        libraryTarget: "umd"
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        stats: 'errors-only',
        compress: true,
        port: 8080,
        host: '0.0.0.0',
        useLocalIp: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            title: package.title
        }),
        new CleanWebpackPlugin()
    ]
}