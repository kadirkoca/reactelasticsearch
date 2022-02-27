const path = require("path")
const { config } = require("dotenv")
const webpack = require("webpack")

config({ path: path.resolve(__dirname, "./.env") })

const mode = process.env.MODE || "development"

const environments = new webpack.DefinePlugin({
    "process.env": JSON.stringify(config({ path: './.env' }).parsed),
})

module.exports = {
    mode,
    entry: ["regenerator-runtime/runtime.js", "./index.tsx"],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "public/"),
    },
    plugins: [
        environments,
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader:  'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
            {
                test: /\.(tsx|ts)$/,
                exclude: /node_modules/,
                use: {
                    loader:  'ts-loader',
                },
            },
            {
                test: /\.s?css$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(jpe?g|svg|png|gif|ico|ttf|otf?)(\?v=\d+\.\d+\.\d+)?$/i,
                type: "asset/resource",
            },
        ],
    },
    devtool: mode === "development" ? "eval-cheap-module-source-map" : false,
    devServer: {
        static: {
            directory: path.join(__dirname, "public"),
        },
        port: process.env.PORT,
        historyApiFallback: true,
        compress: true,
        hot: true, // false
        liveReload: true, // false
    },
    watchOptions: {
        ignored: /node_modules/,
    },
    optimization: {
        minimize: true,
    },
    performance: {
        hints: mode !== "development" ? "error" : false,
        maxEntrypointSize: 2048000,
        maxAssetSize: 2048000,
    },
    cache: false,
}
