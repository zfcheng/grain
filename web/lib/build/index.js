'use strict';
var path = require('path');
process.env.NODE_CONFIG_DIR = path.join(__dirname, '..', '..', 'pc', 'config');
var config = require('config');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var sourcemaps = require('gulp-sourcemaps');
var streamCombine = require('stream-combiner');
var Promise = require('bluebird');
var glob = require('glob');
var xtend = require('xtend');
var through = require('through2');
var nano = require('gulp-cssnano');
var VFile = require('vinyl');
var browserify = require('browserify'); // 使浏览器支持 CommonJS
var babel = require('gulp-babel');
var revReplace = require("gulp-rev-replace");
var watch = require('gulp-watch');
var respawn = require('respawn');

var partialify = require('partialify'); //es6 => es5

var globAsync = Promise.promisify(glob);
var DEST = 'build/';
var srcPath = 'src/*.js';
module.exports = function (gulp) {
    var BUILD_ROOT = config.moduleRoot;
    var APP_ROOT = config.appRoot;
    var APP_ROOT_WEB = config.appRootWeb;

    var dev = process.argv.indexOf('dev') > -1 ? 'dev' : '';
    var APP_ROOT_DEV = path.join(APP_ROOT_WEB, dev);

    var files = globAsync.sync('**/*', {cwd:BUILD_ROOT});
    function dest() {
        var destPath = path.join.apply(path, [APP_ROOT_WEB].concat([].slice.call(arguments)));
        return gulp.dest(destPath);
    }
    function src(opts) {
        opts = opts || {};
        var cwd = {
            cwd: DOT_ROOT,
        };
        opts = xtend(cwd, opts);
        return gulp.src.call(gulp, opts);
    }

    function destRev() {
        var revPath = path.join(APP_ROOT_WEB, 'dist', 'rev.json');
        return streamCombine(
                dest('dist'),
                rev.manifest(revPath, {
                    path: revPath,
                    base: path.join(APP_ROOT_WEB, 'dist'),
                    cwd: '',
                    merge: true
                }), // generate a revision manifest file
                through.obj(function (obj, enc, cb) {
                    console.log(obj.path);
                    this.push(obj);
                    cb();
                }),
                dest('dist') // write it to /dist/rev-manifest.json
            )
    }
    gulp.task('init', function () {
        return gulp.src([
                'pc/**/**/*',
                // '!'+'/**/js/main/**',
            ], {
                cwd: path.join(APP_ROOT_WEB)
            })
            .pipe(through.obj(function (file, enc, done) {
                console.log('trying to copied file: ' + file.path, 'base:', file.base);
                this.push(file);
                done();
            }))
       
            .pipe(dest('dist'))
    })
    gulp.task('init_dev', function () {
        return gulp.src([
                'pc/**/**/*',
                // '!'+'/**/js/main/**',
            ], {
                cwd: path.join(APP_ROOT_WEB)
            })
            .pipe(through.obj(function (file, enc, done) {
                console.log('trying to copied file: ' + file.path, 'base:', file.base);
                this.push(file);
                done();
            }))
       
            .pipe(dest('dev'))
    })
    gulp.task('build-css', ['init'], function () {
        return gulp.src([
                '**/*/css/*.css',
                // '!'+'/**/js/main/**',
            ], {
                cwd: path.join(APP_ROOT_WEB, 'dist')
            })
            .pipe(through.obj(function (file, enc, done) {
                console.log('trying to build css file: ' + file.path, 'base:', file.base);
                this.push(file);
                done();
            }))
            .pipe(nano())
            .pipe(rev())
            .pipe(destRev())
    })
    gulp.task('build-js', ['build-css'], function () {
        
        return gulp.src([
                '**/*/js/main/*.js',
                '**/*.js',
                '!route/*.js',
                '!config/*.js',
                '!*.js'
            ], {
                cwd: path.join(APP_ROOT_WEB, 'dist')
            })
            .pipe(through.obj(function (file, enc, done) {
                console.log('trying to uglify js file: ' + file.path, 'base:', file.base);
                this.push(file);
                done();
            }))
            .pipe(through.obj(function (file, enc, done) {
                if (file.path === path.join(APP_ROOT_WEB, 'dist', 'global.js')) {
                    //console.log(1);
                    this.push(new VFile({
                        cwd: file.cwd,
                        base: file.base,
                        path: file.path,
                        contents: new Buffer(file.path, 'utf-8'),
                    }));
                }
                this.push(file);
                done();
            }))
            .pipe(through.obj(function (file, enc, done) {
                var _this = this;

                var cwd = process.cwd();
                console.log('=--==', APP_ROOT_WEB.replace(/\/$/, '') + '/dist')
                var args = {
                    extensions: ['.html'],
                    basedir: APP_ROOT_WEB.replace(/\/$/, '') + '/dist',
                    paths: ['.'],
                    detectGlobals: false,
                    fullPaths: true
                };

                var b = browserify(args);
                b.add(file.path);
                b
                    .transform(partialify)
                    // .transform("babelify", {presets: ["es2015", "react"]})
                    .bundle(function(err, src) {
                        if(err) {
                            console.log('babelError', err)
                        } else {
                            file.contents = new Buffer(src);
                            _this.push(file);
                        }
                        done();
                    })
            }))

            .pipe(dest('dist'))

            .pipe(uglify({
                compress: {
                    //drop_console: true
                },
                output: {
                    ascii_only: true,
                    quote_keys: true
                }
            }))
            .pipe(rev())
            .pipe(destRev())
    })

    gulp.task('build-rev', ['build-js'], function () {
        var manifest = gulp.src(path.join(APP_ROOT_WEB, 'dist', 'rev.json'));
        return   gulp.src([
                    '**/*/views/*.html',
                    '**/*/partials/*.html',
                    '**/*.html'
                ], {
                    cwd: path.join(APP_ROOT_WEB, 'dist')
                })
                .pipe(through.obj(function (file, enc, done) {
                    console.log('trying to replace html file: ' + file.path);
                    this.push(file);
                    done();
                }))
                .pipe(revReplace({manifest: manifest}))
                .pipe(gulp.dest('dist'));
    })


    files.js = [
            '**/*/js/main/*.js',
            '**/*.js',
            '!route/*.js',
            '!config/*.js',
            '!*.js'
        ];

    gulp.task('prepare-js', ['init_dev'], function () {
        return  gulp.src(files.js, {
                    cwd: path.join(APP_ROOT_WEB, 'dev')
                })
                .pipe(sourcemaps.init())
                .pipe(through.obj(function (file, enc, done) {
                    var _this = this;
                    var args = {
                        extensions: ['.html'],
                        basedir: APP_ROOT_WEB.replace(/\/$/, '') + '/dev',
                        paths: ['.'],
                    };

                    var b = browserify(args);
                    b.add(file.path);
                    b
                        .transform(partialify)
                        // .transform("babelify", {presets: ["es2015", "react"]})
                        .bundle(function(err, src) {
                            if(err) {
                                console.log('babelError', err)
                            } else {
                                file.contents = new Buffer(src);
                                _this.push(file);
                            }
                            done();
                        })
                }))
                .pipe(sourcemaps.write())
                .pipe(dest('dev'))
                .on('data', function (file) {
                    console.log('- [', file.path, ']\n    compiled');
                })
    });


    gulp.task('prepare', ['prepare-js'], function () {
        
    });

    var watchFile = [
                        '**/**/main/*.js'
                    ];
    var watchFileHtml = [
                            '**/**/views/*.html',
                            '**/**/partials/*.html'
                        ]
    gulp.task('dev', ['prepare'], function () {
        var m = respawn([process.execPath, path.join(APP_ROOT_DEV, 'index.js')], {
            cwd: APP_ROOT_DEV,
            env: {
                NODE_ENV: 'development',
                // NODE_CONFIG: '{"AppRoot":"'+APP_ROOT_DEV+'"}',
                NODE_CONFIG_DIR: path.join(APP_ROOT_DEV, 'config'),
            },
            maxRestarts: 0,
            sleep: 0,
            stdio: 'inherit',
        });
        m.start();
        m.on('exit', function (code, signal) {
            if (!code) {
                return;
            }
            console.log('-------------------------------------------------------');
            console.log('app instance exited with code', code, 'and signal', signal);
            console.log('change and save server side script to restart');
            console.log('-------------------------------------------------------\n');
            errorAlert(new Error('app instance exited'));
        });
        watch(watchFile, {cwd: APP_ROOT})
            .on('data', function (file) {
                console.log('- [', file.path, '] updated');
            })
            .pipe(sourcemaps.init())
            .pipe(through.obj(function (file, enc, done) {
                var _this = this;
                var args = {
                    extensions: ['.html'],
                    basedir: APP_ROOT.replace(/\/$/, ''),
                    paths: ['.'],
                };

                var b = browserify(args);
                b.add(file.path);
                b
                    .transform(partialify)
                    // .transform("babelify", {presets: ["es2015", "react"]})
                    .bundle(function(err, src) {
                        if(err) {
                            console.log('babelError', err)
                        } else {
                            file.contents = new Buffer(src);
                            _this.push(file);
                        }
                        done();
                    })
            }))
            .pipe(sourcemaps.write())
            .pipe(dest('dev'))
            .on('data', function (file) {
                console.log('- [', file.path, '] babel compiled');
            });


        watch(watchFileHtml, {cwd: APP_ROOT})
            .on('data', function (file) {
                console.log('- [', file.path, '] updated');
            })
            .pipe(through.obj(function (file, enc, done) {
                console.log('trying to copied file: ' + file.path);
                this.push(file);
                done();
            }))
            .pipe(dest('dev'))
            .on('data', function (file) {
                console.log('- [', file.path, '] html compiled');
            });






    })


    gulp.task('default', ['build-rev'])








}
// gulp.task('default', function() {
    
//     return gulp.src(srcPath)                   
//        .pipe(gulp.dest('buildt'))
//        .pipe(sourcemaps.init())
//        .pipe(uglify())
//        .pipe(rev())
//        .pipe(sourcemaps.write())
//        .pipe(gulp.dest(DEST))
//        .pipe(rev.manifest('rev.json', {
//                 path: 'rev.json',
//                 base: '',
//                 cwd: '',
//                 merge: true
//             }))
//       .pipe(gulp.dest('src'))
//        .on('data', function (data) {
//          console.log('-', data.path)
//        })


        
// });
