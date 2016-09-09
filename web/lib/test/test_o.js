var tape = require('tape');
var o = require('../o');
tape('o.js test', function (t) {
    t.plan(7)
    var tt = {}
    var ttt = 1;
    var p = new Promise(function () {});
    var g = function* () {

    }()
    console.log(typeof g.next)
    t.equal(o.isObject(tt), true);
    t.notEqual(o.isObject(ttt), true);
    t.equal(o.isPromise(p), true);
    t.notEqual(o.isPromise(tt), true)
    t.equal(o.isGenerator(g), true)
    t.notEqual(o.isGenerator(tt), true)
    var v = []
    t.equal(o.isArray(v), true)
});
