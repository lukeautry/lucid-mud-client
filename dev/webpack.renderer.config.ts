import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import webpack from "webpack";

const srcPath = path.join(__dirname, "../renderer");
const distPath = path.join(srcPath, "../dist/renderer");

const config: webpack.Configuration = {
  entry: {
    index: path.join(srcPath, "index.tsx"),
  },
  mode: "development",
  module: {
    rules: [
      {
        loader: "ts-loader",
        options: {
          configFile: "../renderer/tsconfig.json",
        },
        test: /\.tsx?$/,
      },
      {
        loader: "tslint-loader",
        test: /\.tsx?$/,
      },
      {
        test: /\.scss|sass|css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        loader: "url-loader?limit=10000&mimetype=application/font-woff",
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      },
      {
        loader: "url-loader?limit=10000&mimetype=application/font-woff",
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: distPath,
    sourceMapFilename: "[file].map.json",
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ["index"],
      template: path.join(srcPath, "index.ejs"),
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(srcPath, "./vendor/fontawesome"),
        to: distPath,
      },
    ]),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: [
      path.resolve("./node_modules"),
      path.resolve(srcPath),
    ],
  },
  stats: "minimal",
  target: "electron-renderer",
};

export default config;
