const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const fs = require("fs");

module.exports = {
    entry: {
        "index": './src/index.ts',
        "chat": './src/chat/chat.ts',
        "chat_grpc": './src/chat_grpc/chat_grpc.ts',
        "tests": './src/tests/tests.ts',
        "vue_chat": './src/vue_chat/vue_chat.ts'
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
        extensions: ['.tsx', '.ts', '.js', '.json', '.vue', '.css', '.scss'],
        // fallback: {
            // "fs": false,
            // "os": false,
            // 'zlib': false,
            // 'stream': false,
            // 'net': false,
            // 'tls': false,
            // 'url': false,
            // 'http': false,
            // 'http2': false,
            // 'dns': false,
        // },
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
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
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
    experiments: {
        topLevelAwait: true
    }
};