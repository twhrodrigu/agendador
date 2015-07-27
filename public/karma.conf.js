'use strict';

var path = require('path');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'jasmine-matchers'],
    files: [
      'node_modules/phantomjs-polyfill/bind-polyfill.js',
      'src/__tests__/**/*spec.jsx'
    ],
    preprocessors: {
      'src/__tests__/**/*.jsx': ['webpack']
    },
    webpack: {
      context: __dirname + '/public/src',
      module: {
        loaders: [{ 
          test: /\.jsx?$/, exclude: /node_modules/, loader: "jsx-loader?harmony"}
      ]}, 
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
    // browsers: ['Chrome'],
    reporters: ['progress'],
    captureTimeout: 60000,
    singleRun: true,
     plugins: [
      'karma-webpack',
      'karma-jasmine',
      'karma-jasmine-matchers',
      'karma-phantomjs-launcher',
      // 'karma-chrome-launcher',
      ]
  });
};
