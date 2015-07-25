module.exports = {
  debug: true,
  devtool: 'cheap-eval-source-map',
  entry: './src/App.jsx',
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {test: /\.jsx$/, loader: 'jsx-loader?insertPragma=React.DOM&harmony'},
      {test: /\.less/, loader: 'style-loader!css-loader!less-loader'}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    info: true,
    hot: false,
    inline: true,
    proxy: {
      "/v1/*": "http://localhost:9393"
    }
  }
}
