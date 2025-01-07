module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // Injects styles into DOM
          'css-loader',   // Translates CSS into CommonJS
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // For image files
        type: 'asset/resource', // Use Webpack's built-in asset module
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // For font files
        type: 'asset/resource',
      },
    ],
  },
};
