const path = require("path");


//PLUGINS INCLUDED
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPLugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

const fileName = (ext) => isDev ? "[name]."+ext : "[name].[hash]."+ext;

module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: {
        main: ["@babel/polyfill", "./index.js"]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: fileName("js"),
    },
    resolve: {
        extensions: ['.js', 'jsx', '.json', '.png', '.csv', '.xml', '.css']
    },
    devServer: {
        port: 4100,
        hot: isDev
    },
    devtool: 'cheap-module-eval-source-map',
    module: {  
        rules: [
            {
                test: /\.js$/,
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
                    'css-loader',
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
        })
    ]
};