const webpack = require("webpack")

const DEBUG = true

process.traceDeprecation = DEBUG

module.exports = {
  entry: "./src/index.js",

  output: {
    filename: "build/bundle.js",
    path: __dirname,
    libraryTarget: "commonjs2"
  },

  target: "node",

  module: {
    rules: [{
      test: /\.js$/,
      loader: "babel-loader",
      exclude: /node_modules/,
      options: {
        cacheDirectory: DEBUG,
        babelrc: false,
        presets: ["stage-0", "stage-1", "stage-2", "stage-3"]
      }
    }]
  },

  plugins: [
    new webpack.DefinePlugin({"process.env.BROWSER": false}),
    new webpack.DefinePlugin({__DEV__: process.env.NODE_ENV === "development"}),

    new webpack.BannerPlugin({
      banner: "require(\"source-map-support\").install()",
      options: {raw: true, entryOnly: false}
    }),

    new webpack.IgnorePlugin(/\.(css|less|scss)$/),
    new webpack.WatchIgnorePlugin(["build"])
  ],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },

  externals: [
    /^\.\/assets$/,
    (context, request, cb) => {
      cb(null, Boolean(request.match(/^[@a-z][a-z/.\-0-9]*$/i)))
    }
  ],

  devtool: "source-map"
}
