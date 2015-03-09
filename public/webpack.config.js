module.exports = {
  debug: true,
  devtool: 'source-map',
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
  }
}
