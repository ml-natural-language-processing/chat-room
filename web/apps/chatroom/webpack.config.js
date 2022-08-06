const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
    entry: {
        "index": './src/index.ts',
        "chat": './src/chat/chat.ts',
        "chat_grpc": './src/chat_grpc/chat_grpc.ts',
        "tests": './src/tests/tests.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    devtool: 'source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader', // use 和 loader区别是 user后面可以跟多个loader.
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                },
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ],
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json', '.vue'],
        fallback: {
            "fs": false,
            // "os": false,
            // 'zlib': false,
            // 'stream': false,
            // 'net': false,
            // 'tls': false,
            // 'url': false,
            // 'http': false,
            // 'http2': false,
            // 'dns': false,
        },
    },

    externals: {
        // THREE: 'THREE',
        jquery: 'jQuery',
        // zeromq: 'zeromq',
    },
    devServer: {
        // contentBase: path.join(__dirname, 'dist'),
        static: path.join(__dirname, 'dist'),
        host: "0.0.0.0",
        allowedHosts: "all",
        port: 9090,
        open: true,
    },
    plugins: [
        new VueLoaderPlugin(),
        new CopyPlugin({
                patterns: [
                    {from: './src', to: './'},
                    // {from: './src/index.html', to: './index.html'},
                    // {from: './src/proto', to: './proto'},
                ],
            },
        ),

    ],
};