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