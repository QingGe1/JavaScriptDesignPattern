require.config({
  paths: {
    "vue": "https://cdn.bootcss.com/vue/2.6.11/vue.common.dev.js",
  }
});
require(['jquery', 'vue'], function (jQuery, vue) {
  console.log(jQuery)
  console.log(vue)
  console.log(111111)
});