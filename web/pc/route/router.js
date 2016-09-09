module.exports = function (router) {
    router.get('/login', function (req, res, next) {
        res.render({
            moduleName: 'login',
            renderView: 'index'
        }, {a:1})
        // res.send('<div>;alalalalal</div>')
    });
    router.get('/login/default', function (req, res, next) {
        res.locals.user = {name: 'zhangsan', age: 12};
        res.expose(999999, 'number');
        res.render({
            moduleName: 'login',
            renderView: 'default'
        }, {a:1})
        // res.send('<div>;alalalalal</div>')
    });
    router.get('/login/xxx', function (req, res, next) {
        req.uest('GET', '/api/testAccount').end(function (err, b) {
            console.log('------', b.body)
        })
        res.locals.user = {name: 'xxx', age: 99};
        res.expose(666, 'number');
        res.render({
            moduleName: 'login',
            renderView: 'xxx'
        }, {a:1})
        // res.send('<div>;alalalalal</div>')
    });

    router.get('/index/v-index', function (req, res, next) {
        res.render({
            moduleName: 'index',
            renderView: 'v-index'
        }, {a:1})
    });
}