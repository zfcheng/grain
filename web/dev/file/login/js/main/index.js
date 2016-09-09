(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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


},{}],2:[function(require,module,exports){
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
},{"../../js/main/a.js":1,"../../views/ll.html":3}],3:[function(require,module,exports){
module.exports = '<div>\n    <a href="">sd</a>\n    <div>{{zl}}</div>\n    <div>{{messages | json }}</div>\n\n</div>\n<!-- 注意 最外层要被包裹  否则会报错 ：  Attribute "id" is ignored on component <div> because the component is a fragment instance    -->';
},{}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJmaWxlL2xvZ2luL2pzL21haW4vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IGEgZnJvbSAnZmlsZS9sb2dpbi9qcy9hLmpzJ1xuXG5cbnJlcXVpcmUoJy4uLy4uL2pzL21haW4vYS5qcycpXG52YXIgdnVlT2JqZWN0ID0gbmV3IFZ1ZSh7XG4gICAgZWw6ICcjenonLFxuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuLi8uLi92aWV3cy9sbC5odG1sJyksXG4gICAgZGF0YToge1xuICAgICAgICB6bDogJ2xhbGFsYWxhJyxcbiAgICAgICAgbWVzc2FnZXM6ICcxMjMnLFxuICAgIH0sXG5cbiAgICB3YXRjaDoge1xuICAgICAgICB6bDogZnVuY3Rpb24gKHZhbCwgb3ZhbCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ25ldyB2YWw6ICcsIHZhbCwgJ29sZCB2YWw6ICcsIG92YWwpXG4gICAgICAgIH1cbiAgICB9XG59KVxuXG5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmxvZygnMnMgb3ZlcicpO1xuICAgIHZ1ZU9iamVjdC56bCA9IDI7XG59LCAyMDAwKVxuXG5cblxud2luZG93LnZ1ZU9iamVjdCA9IHZ1ZU9iamVjdDsiXSwiZmlsZSI6ImZpbGUvbG9naW4vanMvbWFpbi9pbmRleC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
