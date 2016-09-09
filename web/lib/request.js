var superagent = require('superagent');
var extend = require('extend');
var Request = resuperagent.Request = superagent.Request;
var methods = [
    "checkout",
    "connect",
    "copy",
    "delete",
    "get",
    "head",
    "lock",
    "m-search",
    "merge",
    "mkactivity",
    "mkcol",
    "move",
    "notify",
    "options",
    "patch",
    "post",
    "propfind",
    "proppatch",
    "purge",
    "put",
    "report",
    "search",
    "subscribe",
    "trace",
    "unlock",
    "unsubscribe"
].map(function (method) {
    return method.toUpperCase();
});
module.exports = resuperagent;
function resuperagent () {
    var method, url, query;
    console.log(arguments)
    var args = Array.prototype.slice.call(arguments);
    var strs = [];
    for (var i = 0; i < args.length;) {
        if (typeof args[i] === 'string') {
            var part = args.splice(i, 1)[0]
            if (!method && methods.indexOf(part) > -1) {
                method = part;
            } else {
                strs.push(part);
            }
        } else {
            i += 1;
        }
    }
    var opts = extend.apply(null, [true, method ? {method: method} : {}].concat(args));
    if (typeof opts.url === 'string') {
        strs.push(opts.url);
        delete opts.url;
    }
    url = strs.join('');
    method = (opts.method||'').toUpperCase() || 'GET';
    // if (opts.query) {
    //     query = exports.querySerializer(opts.query);
    //     url += ~url.indexOf('?')
    //         ? '&' + query
    //         : '?' + query;
    // }
    var request = new Request(method, url);
    // var cookies = {};
    // if (opts.headers) {
    //     Object.keys(opts.headers).forEach(function (key) {
    //         var v = opts.headers[key];
    //         key = key.toLowerCase();
    //         if (!v) {
    //             return;
    //         }
    //         if (typeof v === 'function') {
    //             v = v.call(request);
    //         }
    //         if (key === 'cookie' || key === 'cookies') {
    //             extend(cookies, typeof v === 'string' ? cookie.parse(v) : v);
    //         } else if (typeof v === 'string') {
    //             request.set(key, v);
    //         }
    //     });
    // }
    // if (Object.keys(cookies).length) {
    //     cookies = Object.keys(cookies).map(function (k) {
    //         return k + '=' + cookies[k];
    //     }).join('; ');
    //     request.set('Cookie', cookies);
    // }
    // if (method !== 'GET' && method !== 'HEAD') {
    //     request.type(opts.type || promisingagent.defaultBodyType);
    // }
    // if (opts.body) {
    //     request.send(opts.body);
    // }
    return request;
}
resuperagent.extend = function extend () {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(null);
    var fn = this.bind.apply(this, args);
    fn.extend = resuperagent.extend;
    return fn;
};
