const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const babelRc = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          // esmodules: true
          // "chrome": 71
          ie: 11
        },
        useBuiltIns: 'entry',
        corejs: 3

        // debug: true
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['@babel/plugin-syntax-dynamic-import'],
    [
      '@babel/plugin-proposal-decorators',
      { decoratorsBeforeExport: true }
      // { legacy: true }
    ],
    ['@babel/plugin-proposal-class-properties', { loose: true }]
    // [
    //   '@babel/plugin-transform-runtime',
    //   {
    //     absoluteRuntime: false,
    //     corejs: 3,
    //     helpers: true,
    //     regenerator: true,
    //     useESModules: false
    //   }
    // ]
  ]
};

module.exports = {
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: [
          /@babel(?:\/|\\{1,2})runtime|core-js/,
          /canvas-datagrid/
        ],
        // include: [
        //   path.resolve(__dirname, 'src')
        //   // /node_modules(?:\/|\\)lit-element|lit-html/
        //   // /node_modules(?:\/|\\)lit-element|@components|lit-html|@polymer|pwa-helpers|@vaadin/
          // /node_modules\/(?!(lit-html|@polymer|pwa-helpers)\/).*/
        // ],
        use: [
          {
            loader: 'thread-loader',
            options: {}
          },
          {
            loader: 'cache-loader'
          },
          {
            loader: 'babel-loader',
            options: babelRc
          }
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  plugins: [
    new CopyWebpackPlugin([
      'images/**',
      'node_modules/@webcomponents/webcomponentsjs/**',
      'manifest.json'
    ]),
    new HtmlWebpackPlugin({
      chunksSortMode: 'none',
      template: 'index.html'
    })
    // new WorkboxWebpackPlugin.GenerateSW({
    //   include: ['index.html', 'manifest.json', /\.js$/],
    //   exclude: [/\/@webcomponents\/webcomponentsjs\//],
    //   navigateFallback: 'index.html',
    //   swDest: 'service-worker.js',
    //   clientsClaim: true,
    //   skipWaiting: true,
    //   runtimeCaching: [
    //     {
    //       urlPattern: /\/@webcomponents\/webcomponentsjs\//,
    //       handler: 'staleWhileRevalidate'
    //     },
    //     {
    //       urlPattern: /^https:\/\/fonts.gstatic.com\//,
    //       handler: 'staleWhileRevalidate'
    //     }
    //   ]
    // })
  ]
};
