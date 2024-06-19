const path = require("path");

module.exports = {
  entry: "./src/game.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  externals: {
    phaser: "Phaser",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    compress: true,
    port: 8080,
    hot: true,
    watchFiles: {
      paths: ["src/**/*", "index.html"],
    },
    historyApiFallback: {
      rewrites: [{ from: /^\/$/, to: "/index.html" }],
    },
  },
};
