/* Gruntfile.js */

/**
  * Build contants
  * --------------------
  * @desc   Predefined variables used throughout the build
*/
    var $environment            = 'development';    // the build environment (development|production)
    var $scriptName             = 'mdMenu';            // the name of the built script
    var $appPath                = 'src/js';            // path to js application folder
    var $buildPath              = 'dist';          // path to the build folder


/**
  * Watch task selection
  * --------------------
  * @desc   Determine which tasks to run automatically based on $environment
  * @output Set variable $watchTasks - array
*/
    switch($environment)
    {
        default:
        case 'development':
            $watchTasks = ['concat'];
        break;

        case 'production':
            $watchTasks = ['concat','uglify'];
        break;
    }


    module.exports = function(grunt) {

            // Init grunt configuration ..
            grunt.initConfig({


                // Load the package file ..
                pkg: grunt.file.readJSON('package.json'),


                /**
                  * Concat
                  * ------
                  * @package    grunt-contrib-concat
                  * @desc       Concatenate files.
                */
                    concat: {
                        dist: {

                            // Source files to be concatenated ..
                            src: [
                                $appPath+'/lib/*.js',
                                $appPath+'/mdMenu.js',
                                $appPath+'/*.js',
                            ],

                            // The destination file to be concatenated ..
                            dest: $buildPath+'/'+$scriptName+'.js',         
                        }
                    },


                /**
                  * Uglify
                  * ------
                  * @package    grunt-contrib-uglify
                  * @desc       Minify javascript files with UglifyJS
                */
                    uglify: {
                        build: {
                            src:  $buildPath+'/'+$scriptName+'.js',          // The source concatenated file
                            dest: $buildPath+'/'+$scriptName+'.min.js'      // The destination file to be minified
                        }
                    },


                /**
                  * Watch
                  * -----
                  * @package    grunt-contrib-watch
                  * @desc       Run predefined tasks whenever watched file patterns are added, changed or deleted
                */
                    watch: {
                        scripts: {
                            files: [
                              $appPath+'/mdMenu.js',
                              $appPath+'/*.js',
                            ],
                            tasks: $watchTasks,
                        },
                    }

            });


        // Load npm tasks
        //
            grunt.loadNpmTasks('grunt-contrib-concat');
            grunt.loadNpmTasks('grunt-contrib-uglify');
            grunt.loadNpmTasks('grunt-contrib-watch');


        // Register tasks
        //
            grunt.registerTask('default', ['concat', 'uglify']);                        // all tasks    [typing 'grunt' into cp]
            grunt.registerTask('c', ['concat']);                                        // concat only  [typing 'grunt c' into cp]
            grunt.registerTask('u', ['uglify']);                                        // minify only  [typing 'grunt u' into cp]
            grunt.registerTask('w', ['watch']);                                         // watch        [typing 'grunt w' into cp]

    };