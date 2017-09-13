var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var BrowserSyncPlugin = require("browser-sync-webpack-plugin");

var extractPlugin = new ExtractTextPlugin({
    filename: "app.css"
});
var debug = process.env.NODE_ENV !== "production";

module.exports = {
    context: __dirname,
    entry: ["./src/app.js"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.bundle.js"
        // publicPath: "/dist"
    },
    devtool: debug ? "inline-sourcemap" : false,
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loaders: ["awesome-typescript-loader"]
            },
            {
                test: /\.(js|jsx)$/,
                use: ["babel-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.(scss|css)$/,
                use: extractPlugin.extract({
                    use: ["css-loader", "sass-loader"]
                })
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            }
        ]
    },
    plugins: debug
        ? [
            extractPlugin,
            new HtmlWebpackPlugin({
                template: "src/index.html",
                cache: true
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: false,
                mangle: false,
                beautify: true,
                comments: true,
                sourceMap: true
            }),
            new webpack.ProvidePlugin({
                $: "jQuery",
                jQuery : "jQuery"
            }),
            new BrowserSyncPlugin({
                host: "localhost",
                port: 3000,
                server: { baseDir: ["dist"] },
                files: ["dist/*.html"]
            })
        ]
        : [
            extractPlugin,
            new HtmlWebpackPlugin({
                template: "src/index.html"
            }),
            new CleanWebpackPlugin(["dist"]),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                sourceMap: false
            }),
            new webpack.ProvidePlugin({
                $: "jQuery",
                jQuery : "jQuery"
            })
        ]
};
