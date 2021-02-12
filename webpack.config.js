const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    
    module:{
        rules:[
            {
                test: /.*(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options:{
                    name: '[path][hash].[ext]'
                },
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                use: [
                {
                    loader: 'ts-loader'
                }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates css files
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      esModule: true
                    },
                  }
                  ,
                  "@teamsupercell/typings-for-css-modules-loader",
                  // Translates CSS into CommonJS
                  {
                    loader: 'css-loader',
                    options: {
                      modules: {
                        localIdentName: '[path][name]__[local]--[hash:base64:5]'
                      }
                    }
                  },
                  'sass-loader'
                ],
                exclude: /node_modules/
            },
            {
              test: /\.css$/i,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    esModule: true
                  },
                },
                {
                  loader: 'css-loader',
                  options: {
                    modules: {
                      localIdentName: '[path][name]__[local]--[hash:base64:5]'
                    }
                  }
                }
              ]
            },
            {
                test: /\.(html?|tsx?|js|json)$/i,
                use: [
                    {
                        loader:  path.resolve(__dirname, 'plugins/webpack-tokens/index'),
                        options: {
                            tokens: ()=> {return new Map(Object.entries(JSON.parse(
                                fs.readFileSync('./tokens.json', 'utf8'))))}
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src'),
        resources: path.resolve(__dirname, 'resources')
    },
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    plugins: [
      new MiniCssExtractPlugin()
    ],
    watch: true,
    watchOptions: {
        ignored: /node_modules/
    }
};