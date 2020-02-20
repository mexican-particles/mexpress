const webpack = require('webpack');
const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        api: path.resolve("src", "entry", "api.ts"),
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "build", "entry"),
        library: 'main',
        libraryTarget: 'commonjs2',
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: "ts-loader",
                options: {
                    configFile: "tsconfig.json"
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
};
