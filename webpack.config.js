const path = require('path')
const fetch = require('node-fetch').default
const webpack = require('webpack')
const {
  TsconfigPathsPlugin,
} = require('tsconfig-paths-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const getBabelConfig = require('./config-babel.js')

const ENV = process.env.ENV
const baseDir = './src'

module.exports = function () {
  const outputPath =
    ENV === 'development'
      ? __dirname + '/dev-build'
      : __dirname + '/build'

  return {
    mode: ENV,
    entry: `${baseDir}/index.tsx`,

    cache: false,

    output: {
      path: outputPath,
      filename: 'script/bundle.js',
      libraryTarget: 'umd',
    },

    devServer: {
      contentBase: path.join(__dirname, outputPath),
      compress: true,
      port: 9000,
      hot: true,
      open: true,
      before: async function (app, server, compiler) {
        app.get('/youtube-search', (req, res) => {
          const { search } = req.query
          const { searchTerm, videoDuration  } = JSON.parse(search)
          const youtubeAPIUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&&type=video&videoDuration=${videoDuration}&q=${searchTerm}&key=${process.env.YOUTUBE_API_KEY}`

          console.log(youtubeAPIUrl)
          ;(async () => {
            try {
              const apiReq = await fetch(youtubeAPIUrl)
              const body = await apiReq.json()
              res.json(body)
            } catch (e) {
              throw new Error(e.message)
            }
          })()
        })
        app.get('/mockData', (req, res) => {
          res.json(require('./src/mockData/index.json'))
        })
      },
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: ENV === 'development' ? 'source-map' : undefined,

    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: ['.ts', '.tsx', '.js', '.scss', '.json', 'css'],
      modules: [path.join(__dirname, 'node_modules')],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: './tsconfig.json',
          baseUrl: baseDir,
        }),
      ],
    },

    plugins: [
      new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
      }),

      // Webpack plugin that runs TypeScript type checker on a separate process.
      new ForkTsCheckerWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
    ],

    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          include: path.resolve(process.cwd(), './'),
          loader: 'babel-loader',
          options: {
            ...getBabelConfig(),
          },
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          include: path.resolve(process.cwd(), './'),
          loader: 'babel-loader',
          options: {
            ...getBabelConfig(),
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            'css-modules-typescript-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[name]__[local]--[hash:base64:5]',
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                ref: true,
              },
            },
          ],
        },
      ],
    },
  }
}
