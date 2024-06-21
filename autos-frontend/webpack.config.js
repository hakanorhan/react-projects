/*  "dev": "vite",
    "build": "tsc && vite build", */
    import { fileURLToPath } from 'url';
    import { createRequire } from 'module';
    const require = createRequire(import.meta.url);
    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    import { CleanWebpackPlugin } from 'clean-webpack-plugin';
    
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    export default {
      entry: './src/main.tsx',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
        publicPath: '/',
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'],
        alias: {
          '@mui': path.resolve(__dirname, 'node_modules/@mui'),
          '@material-ui': path.resolve(__dirname, 'node_modules/@material-ui'),
        },
      },
      module: {
        rules: [
          {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'ts-loader',
              options: {
                compilerOptions: {
                  noEmit: false
                }
              }
            }
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: 'babel-loader',
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
      plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          template: './index.html',
        }),
        new MiniCssExtractPlugin({
          filename: 'styles.css',
        }),
      ],
      devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 5173,
        historyApiFallback: true,
      },
    };
    