'use strict'
module.exports = 1;
console.log('blblbllblb')

request('GET', '/testAccount').end(function (err, b) {
    console.log('------', b.body)
})

console.log('-----------------------7777778sdcsdcs-')
      
      var b = {
        a:1,
        b:2
      }
      function f() {}
      f.prototype = b;
      var a = new f();


      for(var i = 0; i < 50; i++) {
        b['a' + i] = 1;
      }
      // throw {
      //   name: 'error',
      //   message: 'meee'
      // }
      console.log(a)
      console.log('==', a.b)
      console.log('------------------------')
