const path = require('path');
require('webpack');
require('autoprefixer');

const dstPath = path.resolve(__dirname, './build');

module.exports = {
    entry: ["babel-polyfill", "./src/index.tsx"],
    output: {
        path: dstPath,
        filename: 'bundle.js'
    },

    resolve: {
        extensions: ['.js', '.jsx', ".ts", ".tsx"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader']
            },
            {
                test: /\.tsx?$/,
                use: ['babel-loader', "ts-loader"]
            },
            {
                test: /\.s[a|c]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "./"),
        port: 8090
    },

    watchOptions: {
        poll: true
    },

    watch: true,

    mode: "development"
};
