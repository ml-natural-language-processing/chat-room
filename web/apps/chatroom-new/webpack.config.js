const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const fs = require("fs");

module.exports = {
    entry: {
        "index": './src/index.ts',
        "chat": './src/chat/chat.ts',
        "chat_grpc": './src/chat_grpc/chat_grpc.ts',
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
        extensions: ['tsx', '.ts', '.js'],
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
        port: 80,
        // open: true,
        // https: {
        //     key: fs.readFileSync(path.join(__dirname, "./ca/key.pem")),
        //     cert: fs.readFileSync(path.join(__dirname, "./ca/cert.pem")),
        // }
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
    experiments: {
        topLevelAwait: true
    }
};