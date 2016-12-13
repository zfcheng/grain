module.exports = function (router) {
    router.get('/login', function (req, res, next) {
        res.render({
            moduleName: 'login',
            renderView: 'index'
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


    router.get('/uploadFile', function (req, res, next) {
        res.render({
            moduleName: 'uploadFile',
            renderView: 'index'
        }, {a:1})
    });

    router.get('/domain/iframe', function (req, res, next) {
        res.render({
            moduleName: 'domain',
            renderView: 'iframe'
        })

    })


    router.get('/domain/postMessage1', function (req, res, next) {
        res.render({
            moduleName: 'domain',
            renderView: 'postMessage1'
        })

    })

    router.get('/domain/postMessage2', function (req, res, next) {
        res.render({
            moduleName: 'domain',
            renderView: 'postMessage2'
        })

    })





}