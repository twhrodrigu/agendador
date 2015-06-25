'use strict';

var LIVERELOAD_PORT = 35729;

var lrSnippet = require('connect-livereload')({
  port: LIVERELOAD_PORT
});

var mountFolder = function (conn, dir) {
  return conn.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // Let *load-grunt-tasks* require everything
  require('load-grunt-tasks')(grunt);

  // Read configuration from package.json
  var pkgConfig = grunt.file.readJSON('package.json');
  var jshintConfig = grunt.file.readJSON('.jshintrc');
  var loaders = [
  {
    test: /\.jsx$/,
    loader: 'jsx-loader?insertPragma=React.DOM&harmony'},
  {
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
  }];

  grunt.initConfig({
    pkg: pkgConfig,

    webpack: {
      development: {
        devtool: 'source-map',
        entry: './src/App.jsx',
        output: {
          path: __dirname + '/dist',
          filename: '[name].bundle.js'
        },
        debug: true,
        cache: true,
        stats: {
          colors: true,
          reasons: true
        },
        jshint: grunt.util._.merge(jshintConfig, {
          emitErrors: false,
          failOnHint: false
        }),
        module: {
          preLoaders: [{
            test: '\\.js$',
            exclude: 'node_modules',
            loader: 'jshint'
          }],
          loaders: loaders
        },
        resolve: {
          extensions: ['', '.js', '.jsx']
        },
        devServer: {
          info: true,
          hot: false,
          inline: true,
          proxy: {
            "/v1/*": "http://localhost:9393"
          }
        }
      }
    },
    watch: {
      webpack: {
        files: ['<%= pkg.src %>/**/*.js',
          '<%= pkg.src %>/less/**/*.less',
          '!<%= pkg.src %>/<%= pkg.mainOutput %>.js',
          '<%= pkg.src %>/**/*.jsx'
        ],
        tasks: ['webpack:development', 'karma']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= pkg.src %>/{,*/}*.html',
          '<%= pkg.src %>/**/*.js',
          '<%= pkg.src %>/<%= pkg.mainOutput %>.js'
        ]
      }
    },

    connect: {
      options: {
        port: 8000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, pkgConfig.src)
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, pkgConfig.dist)
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },

    copy: {
      dist: {
        files: [
          // includes files within path
          {
            flatten: true,
            expand: true,
            src: ['<%= pkg.src %>/*'],
            dest: '<%= pkg.dist %>/',
            filter: 'isFile'
          },
          {
            flatten: true,
            expand: true,
            src: ['<%= pkg.src %>/images/*'],
            dest: '<%= pkg.dist %>/images/'
          },
          {
            flatten: true,
            expand: true,
            src: ['<%= pkg.src %>/styles/*'],
            dest: '<%= pkg.dist %>/styles/'
          },
          {
            src: '<%= pkg.src %>/scripts/main.bundle.js',
            dest: '<%= pkg.dist %>/scripts/main.bundle.js'
          }
        ]
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= pkg.dist %>'
          ]
        }]
      }
    },
    /**
     * The task below will push dotfiles (directories and files)
     * that otherwise match the `src` pattern.
     */
    'gh-pages': {
      options: {
        base: 'dist',
        dotfiles: true
      },
      src: '**/*'
    }
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'connect:livereload',
      'webpack:development',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('test', ['karma']);

  grunt.registerTask('build', ['clean', 'copy', 'webpack']);

  grunt.registerTask('default', []);
};
