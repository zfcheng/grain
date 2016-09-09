'use strict';

/**
 * Module dependencies.
 */

var express = require('express');
var config = require('config');
var Promise = require('bluebird');
var glob = require('glob');

var APP_ROOT = config.appRoot;
console.log('APP_ROOT: ', APP_ROOT);
//loader router
var globAsync = Promise.promisify(glob);

/**
 * Expose `loader()`.
 */

exports = module.exports = loader;

 /**
 * Create an route loader.
 *
 * @return {Function}
 * @api public
 */
function loader () {
    console.log('loader router')
    var exportRouter = express.Router();
    globAsync.sync(APP_ROOT + '/route/*.js').forEach(function (routeFileName, index) {
        console.log('> [' + index + '] loading router from file "' + routeFileName + '"');
        var routerPath = require.resolve(routeFileName); //require.resolve 查询模块 确保模块存在
        var routerFactory = require(routeFileName);
        var routerModule = require.cache[routerPath];   //require.cache 缓存代码
        var router = express.Router();
        routerFactory(router);
        // delete require.cache[routerPath];
        exportRouter.use(router);
    })
    return exportRouter;
}