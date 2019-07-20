const webpack = require('webpack');
const path = require('path');

module.exports = (env) => {
//   const ENV = env.dev ? 'DEV' : env.build ? 'BUILD' : env.test ? 'TEST' : '';

  const config = {
    context: path.resolve(__dirname, './src/'),
    entry: './index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist',
      filename: 'statesman.js',
      libraryTarget: 'umd',
      library: 'Statesman',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          // include: path.resolve(__dirname, 'src'),
          use: [
            {
              loader: 'babel-loader',
              options: {
              //   presets: [
              //     ['es2015', { modules: false },
              //     ],
              //   ],
              //   plugins: ['add-module-exports', 'transform-es2015-modules-umd'],
              },
            },
          ],
        },
        // {
        //   test: /\.scss$/,
        //   use: ['style-loader', 'css-loader', 'sass-loader'],
        // },
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
          },
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: ['url-loader?limit=10000', 'img-loader'],
        },
      ],
    },
    plugins: [],
  };
  if (env.dev) {
    config.mode = 'development';
    // config.entry = { dev: './dist/_dev.js' };
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.devtool = 'eval-source-map';
    config.devServer = {
      disableHostCheck: true,
      historyApiFallback: true,
      hot: true,
    };
  }

  // if (env.build) {
  //   config.mode = 'production';
  //   config.entry = { build: './js/_build.js' };
  //   config.optimization = {
  //     minimizer: [new UglifyJSPlugin({
  //       uglifyOptions: {
  //         ecma: 5,
  //         sourceMap: true,
  //         // parallel: false,
  //         // warnings: true,
  //         // parse: {},
  //         compress: {
  //           sequences: true,
  //           dead_code: true,
  //           conditionals: true,
  //           booleans: true,
  //           unused: true,
  //           if_return: true,
  //           join_vars: true,
  //           drop_console: false,
  //         },
  //         mangle: true, // Note `mangle.properties` is `false` by default.
  //         // output: null,
  //         toplevel: true,
  //         // nameCache: null,
  //         ie8: true,
  //         keep_fnames: false,
  //         extractComments: true,
  //       },
  //     })],
  //   };
  //   config.plugins.push(

  //     new webpack.optimize.ModuleConcatenationPlugin(),
  //   );
  // }

//   if (env.test) {
//     config.entry = { test: './test/_test.js' };
//     config.target = 'node';
//     config.externals = [nodeExternals()];
//     config.plugins.push(
//       new CleanWebpackPlugin([path.resolve(__dirname, 'dist')], {
//         exclude: ['build.chatbot.js', 'build.chatbot.scss'],
//         verbose: true,
//         dry: false,
//       }),
//       new webpack.NamedModulesPlugin(),
//       new webpack.HotModuleReplacementPlugin(),
//     );
//   }

  return config;
};