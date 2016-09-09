(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// 定义
var header = Vue.extend({
  template: require('../../partials/header.html')
})

var footer = Vue.extend({
  template: require('../../partials/footer.html')
})


// 注册
Vue.component('app-header', header);
Vue.component('app-footer', footer);

// 创建根实例
new Vue({
  el: '#app-body'
})

console.log('9999999999996789')
},{"../../partials/footer.html":2,"../../partials/header.html":3}],2:[function(require,module,exports){
module.exports = '<div>footer change blblllla</div>';
},{}],3:[function(require,module,exports){
module.exports = '<div>header blbl\n<script type=\'text/javascript\' src=\'/file/login/js/main/a.js\'></script>\n</div>';
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJmaWxlL2dsb2JhbC9qcy9tYWluL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIOWumuS5iVxudmFyIGhlYWRlciA9IFZ1ZS5leHRlbmQoe1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi4vLi4vcGFydGlhbHMvaGVhZGVyLmh0bWwnKVxufSlcblxudmFyIGZvb3RlciA9IFZ1ZS5leHRlbmQoe1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi4vLi4vcGFydGlhbHMvZm9vdGVyLmh0bWwnKVxufSlcblxuXG4vLyDms6jlhoxcblZ1ZS5jb21wb25lbnQoJ2FwcC1oZWFkZXInLCBoZWFkZXIpO1xuVnVlLmNvbXBvbmVudCgnYXBwLWZvb3RlcicsIGZvb3Rlcik7XG5cbi8vIOWIm+W7uuagueWunuS+i1xubmV3IFZ1ZSh7XG4gIGVsOiAnI2FwcC1ib2R5J1xufSlcblxuY29uc29sZS5sb2coJzk5OTk5OTk5OTk5OTY3ODknKSJdLCJmaWxlIjoiZmlsZS9nbG9iYWwvanMvbWFpbi9pbmRleC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
