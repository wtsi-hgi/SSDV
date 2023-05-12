module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader',
          'img-loader',
          
        ],
        // include: paths
      }
    ]
  }
};