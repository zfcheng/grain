'use strict';

var fs = require('fs');
var path = require('path');
var Module = require('module');
var assert = require('assert');
var config = require('config');
assert(config.appRoot);
var str2js = require('string-to-js');

var APP_ROOT = config.appRoot;

var _resolveFilename = Module._resolveFilename;

Module._resolveFilename = function (request, parent) {
    var args = Array.prototype.slice.call(arguments);
    if (request.indexOf('file') == 0 ) {
        args[0] = path.join(APP_ROOT, args[0]);
    }
    return _resolveFilename.apply(this, args);
}
'.html .css'.split(' ').forEach(function (ext) {
    Module._extensions[ext] = function (module, filename) {
        var content = fs.readFileSync(filename, 'utf8');
        module._compile(str2js(content), filename);
    };
});





/*
'use strict';

var fs = require('fs');
var path = require('path');
var Module = require('module');
var assert = require('assert');
var config = require('config');
assert(config.appRoot);
var str2js = require('string-to-js');

var APP_ROOT = config.appRoot;

var _resolveFilename = Module._resolveFilename;

Module._resolveFilename = function (request, parent) {
    var args = Array.prototype.slice.call(arguments);
    if (request.indexOf('file') == 0 ) {
        args[0] = path.join(APP_ROOT, args[0]);
    }
    return _resolveFilename.apply(this, args);
}
'.html .css'.split(' ').forEach(function (ext) {
    Module._extensions[ext] = function (module, filename) {
        var content = fs.readFileSync(filename, 'utf8');
        module._compile(str2js(content), filename);
    };
});

*/
