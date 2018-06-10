var path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const devMode = process.env.NODE_ENV !== "production"

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "./dist",
    port: 9000
  },
  module: {
    rules: [
      { test: /\.pug$/, use: "pug-loader" },
      {
        test: /\.scss$/,
        use: [
          // fallback to style-loader in development
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.pug",
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
}
