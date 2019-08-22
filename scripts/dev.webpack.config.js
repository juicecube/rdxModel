const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (token, cfg, onlineNums) => {
  return  {
    entry: {
      index: path.resolve(__dirname, '../test/index.ts'),
    },
    output: {
      path: __dirname + '../build',
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].js',
      publicPath: '/',
      globalObject: 'this',
      pathinfo: true,
    },
    mode: 'development',
    resolve: {
      modules: [
        'src',
        'node_modules',
      ],
      extensions: ['.js', '.ts', '.d.ts', '.json']
    },
    externals: {},
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      historyApiFallback: true,
      stats: {colors: true},
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin({
        verbose: true,
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        iris: `<script src=${JSON.stringify(cfg.iris)}></script>`,
      }),
    ]
  };
}