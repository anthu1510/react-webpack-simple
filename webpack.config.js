const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    output: {
        path: path.join(__dirname, "build"),
        filename: "bundle.js"
    },
    devServer: {
         historyApiFallback: true,
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        port: 2000
    },
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                     test: /\.(png|svg|jpg|gif)$/,
                    use: [
                       'url-loader'
                     ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            automaticNameMaxLength: 30,
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "React App",
            favicon: path.join(__dirname, "public/assets/images", "favicon.png"),
            meta: {
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
            },
            filename: "index.html",
            template: path.join(__dirname, "public", "index.html")
        })
    ]
}
