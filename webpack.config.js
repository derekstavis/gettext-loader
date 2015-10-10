var config = {

  devtool: 'eval',
  debug: true,

  output: {
    filename: './dist/bundle.js'
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /(node_modules)/, loaders: ['babel'] }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
  }
}

module.exports = config;