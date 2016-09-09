// import a from 'file/login/js/a.js'


require('../../js/main/a.js')
var vueObject = new Vue({
    el: '#zz',
    template: require('../../views/ll.html'),
    data: {
        zl: 'lalalala',
        messages: '123',
    },

    watch: {
        zl: function (val, oval) {
            console.log('new val: ', val, 'old val: ', oval)
        }
    }
})

setTimeout(function () {
    console.log('2s over');
    vueObject.zl = 2;
}, 2000)



window.vueObject = vueObject;