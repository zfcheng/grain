(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJmaWxlL2xvZ2luL2pzL21haW4vYS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcbm1vZHVsZS5leHBvcnRzID0gMTtcbmNvbnNvbGUubG9nKCdibGJsYmxsYmxiJylcblxucmVxdWVzdCgnR0VUJywgJy90ZXN0QWNjb3VudCcpLmVuZChmdW5jdGlvbiAoZXJyLCBiKSB7XG4gICAgY29uc29sZS5sb2coJy0tLS0tLScsIGIuYm9keSlcbn0pXG5cbmNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLTc3Nzc3NzhzZGNzZGNzLScpXG4gICAgICBcbiAgICAgIHZhciBiID0ge1xuICAgICAgICBhOjEsXG4gICAgICAgIGI6MlxuICAgICAgfVxuICAgICAgZnVuY3Rpb24gZigpIHt9XG4gICAgICBmLnByb3RvdHlwZSA9IGI7XG4gICAgICB2YXIgYSA9IG5ldyBmKCk7XG5cblxuICAgICAgZm9yKHZhciBpID0gMDsgaSA8IDUwOyBpKyspIHtcbiAgICAgICAgYlsnYScgKyBpXSA9IDE7XG4gICAgICB9XG4gICAgICAvLyB0aHJvdyB7XG4gICAgICAvLyAgIG5hbWU6ICdlcnJvcicsXG4gICAgICAvLyAgIG1lc3NhZ2U6ICdtZWVlJ1xuICAgICAgLy8gfVxuICAgICAgY29uc29sZS5sb2coYSlcbiAgICAgIGNvbnNvbGUubG9nKCc9PScsIGEuYilcbiAgICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nKVxuIl0sImZpbGUiOiJmaWxlL2xvZ2luL2pzL21haW4vYS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
