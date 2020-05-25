const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require('terser-webpack-plugin');

//PLUGINS INCLUDED
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPLugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === "development";

const fileName = (ext) => isDev ? "[name]." + ext : "[name].[hash]." + ext;

const optimizeFiles = (isDevelopment) => {
    if(isDevelopment) {
        return {};
    }
    return {
        minimize: true,
        removeAvailableModules: true,
        minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
    }
}

module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: {
        main: [
            "@babel/polyfill",
            "./index.js"
        ]
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: fileName("js"),
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".png", ".csv", ".xml", ".css", ".ts"]
    },
    devServer: {
        port: 4100,
        publicPath: "/",
        contentBase: path.resolve(__dirname, "./dist"),
        watchContentBase: true,
        hot: true,
        inline: true,
        historyApiFallback: true,
    },
    optimization: optimizeFiles(isDev),
    devtool: "source-maps",
    module: {  
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: !isDev,
                        },
                    },
                    "css-loader"
                ],
            },
            {
                test: /\.(png|svg|gif|jpg|jpeg)$/,
                use: ["file-loader"]
            },
            {
                test: /\.(ttf|woff|woff2)$/,
                use: ["file-loader"]
            },
        ]
    },
    plugins: [
        new HTMLWebpackPLugin({
            template: "./index.html",
            filename: "index.html",
            minify: {
                collapseWhitespace: !isDev
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: fileName("css")
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};