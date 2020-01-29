module.exports = {
  context: __dirname + "/js",
  entry: {
    bundle: './index.jsx',
    // dash: './dash.jsx'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  output: {
    path: __dirname + '/static/js',
    filename: '[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  }
};
