module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ["dist/css", 'dist/fonts', 'dist/js', 'dist/img', 'dist/locales', 'dist/doc', "docu/dist/css",
            'docu/dist/js', 'docu/dist/img', 'docu/dist/locales', 'docu/dist/doc',
            'dist/PgnViewerJS*.zip'],
        concat: {
            all: {
                src: [
                    //'js/polyfill.min.js',
                    'chess.js/thchess.js',
                    'js/chessground.js',
                    'js/i18next.js',
                    'js/i18nextXHRBackend.js',
                    'js/i18nextLocalStorageCache.js',
                    'js/Timer.js',
                    'js/smoothscroll.js',
                    'js/sweetalert.min.js',
                    'js/mousetrap.js',
                    'js/pgn.js',
                    'js/pgn-parser.js',
                    'js/pgnvjs.js'
                ],
                dest: 'dist/js/pgnvjs.js'
            },
            dev: {
                src: [
                    // 'chess.js/thchess.js',
                    // 'js/chessground.js',
                    'js/i18next.js',
                    'js/i18nextXHRBackend.js',
                    'js/i18nextLocalStorageCache.js',
                    'js/Timer.js',
                    'js/smoothscroll.js',
                    'js/sweetalert.min.js',
                    'js/mousetrap.js',
                    'js/pgn-parser.js'
                ],
                dest: 'dist/js/third.js'
            },
            makruk: {
                src: [
                    'chess.js/thchess.js',
                    'js/chessground.js',
                    'js/i18next.js',
                    'js/i18nextXHRBackend.js',
                    'js/i18nextLocalStorageCache.js',
                    'js/Timer.js',
                    'js/smoothscroll.js',
                    'js/sweetalert.min.js',
                    'js/mousetrap.js',
                    'js/draw-board.js',
                    'js/pgn.js',
                    'js/pgn-parser.js',
                    'js/pgnvjs.js'
                ],
                dest: 'makruk/js/pgnvjs.js'
            }
        },
        uglify: {
            js: {
                src: ['dist/js/pgnvjs.js'],
                dest: 'dist/js/min/pgnvjs.js'
            }
        },
        // babel: {
        //     options: {
        //         sourceMap: false
        //     },
        //     dist: {
        //         files: [ { 
        //             expand: true,
        //             cwd: 'tmp/js',
        //             dest: 'dist/js/',
        //             src:  [ '*.js']
        //         }
        //         ]
        //     }
        // },
        copy: {
            all: {
                files: [
                    {
                        src: [
                            'locales/**',
                            'img/chesspieces/**',
                            'img/pattern/**',
                            'img/*.png',
                            'css/images/**'],
                        dest: 'dist',
                        expand: true
                    },
                    {
                        expand: true,
                        cwd: 'font-awesome',
                        src: 'fonts/**',
                        dest: 'dist'
                    }
                ]
            },
            markdown: {
                files: [
                    {
                        expand: true,
                        cwd: 'docu',
                        src: ['css/**', 'img/**'],
                        dest: 'dist/doc'
                    }
                ]
            },
            makruk: {
                files: [
                    {
                        src: [
                            'locales/**',
                            'img/chesspieces/**',
                            'img/pattern/**',
                            'img/*.png',
                            'css/images/**',
                            'node_modules/fairy-stockfish.js/*',
                            'index.html'],
                        dest: 'makruk',
                        expand: true
                    },
                    {
                        expand: true,
                        cwd: 'font-awesome',
                        src: 'fonts/**',
                        dest: 'makruk'
                    }
                ]
            }
        },
        markdown: {
            all: {
                files: [
                    {
                        expand: true,
                        src: '*.md',
                        dest: 'dist/doc/',
                        ext: '.html'
                    }
                ],
                options: {
                    template: 'template.jst'}
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'dist/PgnViewerJS-0.9.8.zip'
                },
                expand: true,
                cwd: 'dist/',
                src: ['**/*', '!PgnViewerJS-*.zip'],
                dest: ''
            }
        },
        concat_css: {
            options: {
                // Task-specific options go here.
            },
            all: {
                src: [
                    'font-awesome/css/font-awesome.css',
                    'css/chessground.css',
                    'css/theme.css',
                    'css/pgnvjs.css'
                ],
                dest: "dist/css/pgnvjs.css"
            },
            dev: {
                src: [
                    'font-awesome/css/font-awesome.css',
                    'css/chessground.css'
                ],
                dest: 'dist/css/third.css'
            },
            makruk: {
                src: [
                    'font-awesome/css/font-awesome.css',
                    'css/chessground.css',
                    'css/theme.css',
                    'css/analysis.css',
                    'css/pgnvjs.css',
                    'css/modal.css'
                ],
                dest: "makruk/css/pgnvjs.css"
            }
        }

    });

    // Load the necessary tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-babel');

    // Default task.
    // uglify does not work with ES6
    //grunt.registerTask('default', ['clean', 'concat:all', 'concat_css',  'uglify', 'copy:all', 'genExamples']);
    grunt.registerTask('default', ['clean', 'concat:all', 'concat_css',  'copy:all', 'genExamples']);
    grunt.registerTask('debug', ['clean', 'concat:all', 'copy:all']);
    grunt.registerTask('dev', ['concat:dev', 'concat_css:dev']);
    grunt.registerTask('makruk', ['concat:makruk', 'concat_css:makruk',  'copy:makruk']);

    /* Define the function and register it to generate the HTML example files in the documentation.
       This should be redone for each release then ...        */
    grunt.registerTask('genExamples', function() {
        var htmlEscape = function(str) {
            return (str + '')
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
                .replace(/\//g, '&#x2F;')
                .replace(/`/g, '&#x60;');
        };
        console.log("Will generate examples in directory: " + __dirname + '\\docu\\examples');
        var fs = require('fs');
        require('./docu/js/examples.js');
        console.log("Available keys: " + Object.keys(examples));
        var exKeys = Object.keys(examples);
        // Loop through all examples
        for (var i=0; i < exKeys.length; i++) {
            var ex = examples[exKeys[i]];
            var buf = "";
            buf += '<!DOCTYPE html>' + "\r\n";
            buf += '<html>' + "\r\n";
            buf += '<head>' + "\r\n";
            buf += '<meta charset="utf-8" />' + "\r\n";
            buf += '<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />' + "\r\n";
            buf += '<title>' + ex.name + '</title>' + "\r\n";
            buf += '<link rel="stylesheet" href="../../dist/css/pgnvjs.css" />' + "\r\n";
            buf += '<link rel="stylesheet" href="../css/prettify.css" />' + "\r\n";
            buf += '<link rel="stylesheet" href="../css/layout.css" />' + "\r\n";
            buf += '<script src="../../dist/js/pgnvjs.js" type="text/javascript" ></script>' + "\r\n";
            buf += '<script src="../js/prettify.js" type="text/javascript" ></script>' + "\r\n";
            buf += '</head>' + "\r\n";
            buf += '<body class="merida zeit">' + "\r\n";
            buf += '<h2>' + ex.name + '</h2>' + "\r\n";
            buf += '<h3>Javascript part</h3>' + "\r\n";
            buf += '<pre class="prettyprint lang-js">' + ex.jsStr + '</pre>' + "\r\n";
            buf += '<h3>HTML part</h3>' + "\r\n";
            buf += '<pre class="prettyprint lang-html">' + htmlEscape(ex.html) + '</pre>' + "\r\n";
            buf += '<p>See the <a href="../examples.html#' + exKeys[i] + '">back link</a> to the original examples page.</p>' + "\r\n";
            buf += '<div>' + ex.desc + '</div>' + "\r\n";
            buf += ex.html + "\r\n";
            buf += '<script>' + "\r\n";
            buf += ex.jsStr + "\r\n";
            buf += '</script>' + "\r\n";
            buf += '<script>prettyPrint();</script>' + "\r\n";
            buf += '</body>' + "\r\n";
            buf += '</html>' + "\r\n";
            fs.writeFileSync('docu/examples/' + exKeys[i] + ".html", buf);
        }
    })
};