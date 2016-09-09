var path = require('path');
process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config');

// require('../lib/require-hack')
var express = require('express');
var app = express();
var config = require('config');
var logger = require('morgan');   //记录器 打印请求
// var vue = require('vue/src')

require('../lib/app-hack').hack(app);
// require('../lib/apiproxy')(app, config.urlBackend)
// app.use(express.static(path.join(__dirname, 'file')));
app.use(express.static(path.join(__dirname, 'static')));

require('../lib/app-render').augmentApp(app);

console.log('config: \n', config);
require('../lib/expose')(app); //设定命名空间
app.expose({bar: 'bar'}, 'foo');
app.use(logger('dev'))
app.use('/test', function (req, res, next) {
    res.expose('sadas', '123');
    res.json({a:1});
})

app.use('/', require('../lib/loadRoute')());

// Promise
var Promise = require('bluebird');
var co = require('co');


// var p2 = co.wrap(function* () {
//     return Promise.resolve(22)
// })
var p1 = function () {
        return Promise.resolve(11)
    }
var cco = co(function* () {
    var p2 = yield p1();
}).catch(onerror);
function onerror(err) {
  console.error(err.stack);
}
var fn = co.wrap(function* (val) {
  return yield Promise.resolve(val);
});
fn(true).then(function (val) {
    console.log('--==wrap ', val)
});

app.set('PORT', 4006);
app.listen(app.get('PORT'), '0.0.0.0', function () {
    console.log('server listening at http://127.0.0.1:4006');
})


/*
app.listen 源码
app.listen = function listen() {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};
*/