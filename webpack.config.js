let path = require('path')
let webpack = require('webpack')

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: 'im',
    libraryExport: "default",
    globalObject: 'this',
    libraryTarget: 'umd'
  },
  mode: "production",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    overlay: true
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            include: [
                path.resolve(__dirname, 'lib')
            ],
            exclude: /(node_modules|bower_components)/,
            loader: "babel-loader",
        },
        {
            test: /\.(ts|tsx)?$/,
            use: [
              'babel-loader?cacheDirectory=true',
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true,
                },
              },
            ],
            include: path.resolve(__dirname, 'lib'),
            exclude: /(node_modules)/,
        },
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.d.ts']
  }
}