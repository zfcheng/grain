module.exports = function (router) {
    router.get('/testAccount', function (req, res) {
        // res.render('index.html')
        console.log('this is router testAccount')
        res.json({cc:1})
    })
    router.get('/api/testAccount', function (req, res) {
        // res.render('index.html')
        console.log('this is router api testAccount')
        res.json({cc:'api'})
    })
}