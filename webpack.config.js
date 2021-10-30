var webpack = require("webpack");
var path = require("path");

var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src/js");

module.exports = {
    entry: SRC_DIR + "/index.js",
    output: {
        path: DIST_DIR,
        filename: "mtg_bundle.js"
    },

    devtool: "eval-source-map",

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-react"]
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]

    }
}