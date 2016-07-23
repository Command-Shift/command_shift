module.exports = {
  entry: "./Client/Admin_client/app.jsx",
  output: {
      path: __dirname + '/Build',
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
            loader: 'babel',
            exclude: /(node_modules)/,
            query: {
              presets: ['es2015', 'react']
            }
          }
      ]
  }
};