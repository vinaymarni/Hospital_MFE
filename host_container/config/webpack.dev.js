const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const axios = require('axios');

// Define the function to check available remotes
const getAvailableRemotes = async () => {
  const remotes = {
    panel_one: 'http://localhost:8081/remoteEntry.js',
    panel_two: 'http://localhost:8082/remoteEntry.js',
    panel_three: 'http://localhost:8083/remoteEntry.js',
    panel_four: 'http://localhost:8084/remoteEntry.js',
    panel_login: 'http://localhost:8085/remoteEntry.js',
  };

  const availableRemotes = {};

  const promises = Object.entries(remotes).map(async ([key, url]) => {
    console.log(key);
    try {
      const response = await axios.head(url, { timeout: 2000 }); // Timeout for faster checks
      if (response.status === 200) {
        availableRemotes[key] = `${key}@${url}`;
      }
    } catch (error) {
      console.warn(`Remote not available: ${key} at ${url}`);
    }
  });

  await Promise.all(promises);
  return availableRemotes;
};

// Asynchronous Webpack Configuration
module.exports = async () => {
  const availableRemotes = await getAvailableRemotes();

  const devConfig = {
    mode: 'development',
    devServer: {
      port: 8080,
      historyApiFallback: {
        index: 'index.html',
      },
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'container',
        remotes: availableRemotes, // Use dynamically determined remotes
        shared: packageJson.dependencies,
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
    ],
  };

  return merge(commonConfig, devConfig);
};
