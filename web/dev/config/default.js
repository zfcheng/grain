"use strict";
var path = require('path');
module.exports = function(options) {
    return {
        // appRoot: path.resolve(__dirname, '..', 'pc'),
        appRoot: path.resolve(__dirname, '..'),
        component: 'file',
        appRootWeb: path.resolve(__dirname, '..', '..'),
        ExpressStateNameSpace: 'G',
        // moduleRoot: path.resolve(__dirname, '..', 'pc', 'file'),
        moduleRoot: path.resolve(__dirname, '..', 'file'),
        project: {
            name: 'grain',
            module: 'file'
        },
        RequestAllowCookie: ['ccat'],
        dsSupportIE8: true,
        // project name 作为 log.io的 node name
        project_name: path.basename(path.join(__dirname, "..")),
        port: 4001,
        urlBackend: 'http://localhost:4006',
        domain: ''
    }
}()

