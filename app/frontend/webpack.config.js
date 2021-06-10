module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
        devServer: {
          historyApiFallback: true,
          contentBase: './',
          hot: true
       },
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
