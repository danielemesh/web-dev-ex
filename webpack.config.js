const path              = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "app/index.html"),
    filename: "index.html",
    inject:   "body"
});

module.exports = {
    entry:   "./app/index.js",
    output:  {
        path:     path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    devtool: "inline-source-map",
    module:  {
        rules: [{
            test: /\.scss$/,
            use:  [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader", options: {
                    sourceMap: true
                } // compiles Sass to CSS
            }]
        }]
    },
    plugins: [
        HTMLWebpackPluginConfig
    ]
};