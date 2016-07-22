module.exports = {
  entry: "./client/index.js",
  output: {
      path: __dirname + '/build',
      publicPath: '/assets/',
      filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
      loaders: [
          {
            test: /\.css$/,
            loaders: ['style', 'css']
          },
          {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
          },
          {
            test: /\.jsx?$/,
            loaders: ['babel?cacheDirectory'],
            exclude: /(node_modules)/
          }
      ]
  }
};
