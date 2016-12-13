var config = require('config');
var path = require('path');
var serveStatic = require('serve-static');
// require('./require-hack')
var browserify = require('browserify'); // 是浏览器支持 CommonJS
var partialify = require('partialify'); //es6 => es5
var babelify = require('babelify');   //
var Promise = require('bluebird');
var request = require('./request').extend(config.urlBackend.replace(/\/+$/, ''));
var glob = require('glob');
var APP_ROOT = config.appRoot;
exports.hack = function (app) {
    app.use(function (req, res, next) {
        req.uest = request;
        next();
    })



    var args = {
        // extensions: ['.html'],
        basedir: APP_ROOT,
        paths: ['.'],
        // cache: this.cache,
        // packageCache: {},
        // fullPaths: true,
    };
    // app.use(function (req, res, next) {
    //     var pathReg = /^\/file\/[^\/]+\/js\/.*\.js$/;
    //     if(pathReg.test(req.url)){
    //         res.setHeader('content-type', 'application/javascript');
    //         res.type('js');
    //         // var b = browserify(config.appRoot + req.url).bundle();

    //         var bundle = Promise.coroutine(function* (filePath, opts) {
    //             var b = browserify(args);
    //             b.add(filePath);
    //             b.transform(partialify)
    //             .transform("babelify", {presets: ["es2015", "react"]})
    //             var src = yield bundlePromise(b);
    //             return src;
    //         })
    //         bundle(config.appRoot + req.url).then(function (src) {
    //             res.send(src);
    //         })
    //     }else{
    //         next();
    //     }
    // });

    function bundlePromise(b) { // because b.bundle checks arity :(
        return new Promise(function (resolve, reject) {
            b.bundle(function (err, src) {
                if (err) {
                    return reject(err);
                }
                resolve(src);
            });
        });
    }

    var st = serveStatic(path.join(config.appRoot));
    app.use(function (req, res, next) {
        if (req.path.match(/^\/file\/([^\/]+\/(css|js|img)\/|(global|common)-[^\/]+\.js$)/)) {
            st(req, res, next);
        } else {
            next();
        }
    });
    app.use(function(req, res, next) {
       if (req.url === '/file/global.js') {
            res.setHeader('content-type', 'application/javascript');
            var b = browserify(config.appRootWeb + '/lib/global.js').bundle();
            b.on('error', console.error);
            b.pipe(res);
        }else {
            next();
        }
    });


}