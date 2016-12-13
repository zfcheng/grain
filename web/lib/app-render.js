var config = require('config');
var fs = require('fs');
var Vue = require('vue');
var Promise = require('bluebird');
var html2js = require('html2js')
var appRoot = config.appRoot;
var moduleRoot = config.moduleRoot;
var project = config.project;
require('./require-hack')
exports.augmentApp = augmentApp;
function augmentApp (app) {
    app.response.hackRender = function () {
        var arg = arguments[0];
        var modulePath = moduleRoot + '/' + arg.moduleName + '/views/' + arg.renderView + '.html';
        var template = getView(modulePath);
        var res = this;
        var script = makeAppScript(template, res.locals, app);

        var html = getView(moduleRoot + '/app.html');
        console.log('-------', modulePath)
        console.log('-------', moduleRoot + '/app.html')
        return new Promise(function (resolve, reject) {
            resolve({
                html: html,
                script: script
            });
        });
    }
    app.response.render = function () {
        // console.log('===---' + JSON.stringify(arguments[0]), appRoot)
        var res = this;
        var fn = arguments[arguments.length - 1];
        if (typeof fn !== 'function') {
            fn = function (err, obj) {
                if (err) {
                    return res.req.next(err);
                }
                Promise.props(obj).then(function (rel) {
                    console.log('===== send html', rel.html + rel.script.loadScript + rel.script.script)
                    var html = rel.html + rel.script.script + rel.script.loadScript;
                    res.send(html);
                })
                
            };
            function htmlToVue(html) {
                var vue = new Vue({
                    template: html
                })
                return vue.getOuterHTML;
                // return Object.prototype.toString.call(vue);
            }
        }
        res.hackRender.apply(this, arguments)
            .then(fn.bind(null, null))
            .catch(fn);
    };
}
exports.getView = getView;
function makeAppScript(template, data, app) {
        var o  = new Promise(function (resolve, reject) {
            template.then(function (temp) {
                // var temp = temp.replace(/\n\s*/g, '');
                // str.match(/<script(?:\s+[^>]*)?>(.*?)<\/script\s*>/ig)

                // var reg = /<script((?!script>).)*script>/gm;
                var reg = /<script(?:\s+[^>]*)?>((.|\n)*?)<\/script\s*>/ig
                var aScript = temp.match(reg) ? temp.match(reg) : [];
                console.log('000----x', aScript)

                var temp = html2js(temp, {
                    mode: 'default',
                    wrap: false
                });
                
                
                resolve({
                    script:  ['<script> new Vue({ el: "#app-main", template: ',
                        temp,
                        ', data: ',
                        JSON.stringify(data),
                        ' });',
                        app.locals.state.toString(),
                        ' </script>'].join(''),
                    loadScript: aScript.join('')
                });
            })
        })
        return o;
}

function getView(filePath) {
    return readFile(filePath, 'utf-8')
        .then(function (template) {
            return template;
        });
}

function readFile(filePath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, 'utf8', function (err, content) {
            if (err) {
                return reject(err);
            }
            resolve(content);
        });
    });
}