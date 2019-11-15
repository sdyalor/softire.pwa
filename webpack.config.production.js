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
          ie: 11
        },
        useBuiltIns: 'entry',
        corejs: 3
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['@babel/plugin-syntax-dynamic-import'],
    [
      '@babel/plugin-proposal-decorators',
      { decoratorsBeforeExport: true }
    ],
    ['@babel/plugin-proposal-class-properties', { loose: true }]
  ]
};

module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: [
          /@babel(?:\/|\\{1,2})runtime|core-js/,
          /canvas-datagrid/
        ],
        use: [
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
      'manifest.json'
    ]),
    new HtmlWebpackPlugin({
      chunksSortMode: 'none',
      template: 'index.html'
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      include: ['index.html', 'manifest.json', /\.js$/],
      navigateFallback: 'index.html',
      swDest: 'service-worker.js',
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts.gstatic.com\//,
          handler: 'staleWhileRevalidate'
        }
      ]
    })
  ]
};
