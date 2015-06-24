'use strict';

var path = require('path');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'test/test.bundle.jsx'
    ],
    preprocessors: {
      'test/test.bundle.jsx': ['webpack']
    },
    webpack: {
      cache: false,
      loaders: [
        {
          test: /\.jsx$/,
          loader: 'jsx-loader?insertPragma=React.DOM&harmony'
        }, {
          test: /\.css$/,
          loader: 'style!css'
        }, {
          test: /\.gif/,
          loader: 'url-loader?limit=10000&minetype=image/gif'
        }, {
          test: /\.jpg/,
          loader: 'url-loader?limit=10000&minetype=image/jpg'
        }, {
          test: /\.png/,
          loader: 'url-loader?limit=10000&minetype=image/png'
        }, {
          test: /\.js$/,
          loader: 'jsx-loader'
        },  {
          test: /\.less/,
          loader: 'style-loader!css-loader!less-loader'
        },  {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        }, {
          test: /\.(woff|woff2)$/,
          loader: 'url-loader?limit=8192'
        }
      ],
      resolve: {
        alias: {
          'styles': path.join(process.cwd(), './src/less/'),
          'components': path.join(process.cwd(), './src/components/')
        },
        extensions: ['', '.js', '.jsx']
      }
    },
    webpackServer: {
      stats: {
        colors: true
      }
    },
    exclude: [],
    port: 8080,
    logLevel: config.LOG_INFO,
    colors: true,
    autoWatch: false,
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],
    reporters: ['progress'],
    captureTimeout: 60000,
    singleRun: true
  });
};
