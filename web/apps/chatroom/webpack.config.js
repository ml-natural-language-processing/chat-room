const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
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
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
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
        port: 9090,
        open: true,
    },
    plugins: [
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