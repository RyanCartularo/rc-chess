const path = require("path")
var HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports ={
    entry: './src/test.html',
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html"
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            }

        ]
    }
}