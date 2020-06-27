// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from "axios";

import store from "./vuex/store";

//

//引入ElementUI框架
import ElementUI from "element-ui";
//引入element-ui的默认CSS样式

import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

Vue.prototype.$axios = axios;
// 过滤器，转换时间戳为正常时间
Vue.filter("formatDate", function(timestamp) {
  if (timestamp == 0 || timestamp == "") {
    //console.log(timestamp);
    return "";
  }
  var date = new Date(parseInt(timestamp)); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = date.getDate() + " ";
  // var h = date.getHours() + ":";
  // var m = date.getMinutes() + ":";
  // var s = date.getSeconds();
  // console.log(date);
  return Y + M + D;
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
