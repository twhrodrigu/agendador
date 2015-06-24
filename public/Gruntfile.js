module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Do grunt-related things in here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        react: {
            dynamic_mappings: {
                files: [
                    {
                        expand: true,
                        src: ['src/**/*.jsx', "__tests__/**/*.jsx"],
                        dest: 'build_jsx/',
                        ext: '.js'
                    }
                ]
            }
        },
        watch: {
            files: ['**/*.jsx'],
            tasks: ['build'],
            options: {
                event: ['changed'],
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });

    grunt.registerTask('build', ['react']);
    grunt.registerTask('test', ['build', 'karma']);
    grunt.registerTask('serve', ['build', 'watch']);

};
