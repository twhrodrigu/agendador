'use strict';

var path = require('path');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'node_modules/phantomjs-polyfill/bind-polyfill.js',
      'src/__tests__/**/*spec.jsx'
    ],
    preprocessors: {
      'src/**/*.jsx': ['webpack', 'sourcemap'],
      'src/**/*.js':  ['webpack', 'sourcemap']
    },
    webpack: {
      context: __dirname + '/public/src',
      debug: true,
      devtool: 'inline-source-map',
      module: {
        loaders: [{ test: /\.jsx?$/, exclude: /node_modules/, loader: "babel"} ]
      },
      resolveLoader:{
        root: __dirname + "/node_modules/"
      },
      resolve: {
        alias: {
          'styles': path.join(process.cwd(), './src/less/'),
          'components': path.join(process.cwd(), './src/components/')
        },
        extensions: ['', '.js', '.jsx']
      }
    },
    webpackServer: {
      noInfo: true,
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
    singleRun: true,
     plugins: [
      'karma-webpack',
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader'
      ]
  });
};
