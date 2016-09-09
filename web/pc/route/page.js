module.exports = function (router) {
    router.get('/testPage', function (req, res) {
        // res.render('index.html')
        console.log('this is router testPage')
        res.json({cc:1})
    })
}