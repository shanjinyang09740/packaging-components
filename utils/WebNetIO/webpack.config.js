const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

const resolve = (_path) => path.resolve(__dirname, _path)

module.exports = (env) => {
  let envConfig = {}
  let commonConfig = {
    target: "web",
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    },
    resolve: {
      extensions: ["", ".html", ".js", ".json", ".scss", ".css"],
      alias: {
        "@": resolve("src"),
        "@utils": resolve("src/utils"),
      },
    },
    devServer: {
      static: resolve("dist"), // This tells `webpack-dev-server` to serve the files from the `dist` directory on `localhost:8080`
      hot: true,
    },
    optimization: {
      // runtimeChunk: "single",
      // splitChunks: {
      //   chunks: "all",
      // },
    },
  }

  if (env.mode === "development") {
    envConfig = {
      entry: {
        demo: {
          import: "./src/demo/index.js",
        },
      },
      output: {
        filename: "[name].js",
        path: resolve("dist"),
        clean: true,
      },
      mode: env.mode,
      devtool: "inline-source-map",
      plugins: [
        new CopyWebpackPlugin({
          patterns: [{ from: resolve("public") }],
        }),
        new HtmlWebpackPlugin({
          title: "demo",
          template: "src/assets/index.html",
          chunks: ["demo"],
        }),
      ],
      optimization: {
        runtimeChunk: "single",
        // splitChunks: {
        //   chunks: "all",
        // },
      },
    }
  } else {
    envConfig = {
      entry: {
        netio: {
          import: resolve("WebNetIO.js"),
        },
      },
      output: {
        filename: "[name].js",
        path: resolve("lib"),
        clean: true,
        library: {
          name: "netio",
          type: "umd",
        },
      },
      mode: env.mode,
      devtool: "source-map",
    }
  }

  let config = Object.assign(commonConfig, envConfig)

  return config
}
