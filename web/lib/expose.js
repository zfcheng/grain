var state = require('express-state');
module.exports = function expose (app, namespace) {
    state.extend(app);
    if(!app.set('state namespace')) {
        app.set('state namespace', 'G');    //G 为全局明明空间
    }
}