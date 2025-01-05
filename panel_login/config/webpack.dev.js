const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8085,
    headers: { 
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: {
      index: 'index.html', 
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'panel_login',
      filename: 'remoteEntry.js',
      exposes: {
        './PanelLoginApp': './src/bootstrap',
      }, 
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
