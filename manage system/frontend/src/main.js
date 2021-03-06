// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-theme-chalk';
import 'element-ui/lib/theme-chalk/index.css';
import api from './http/index'
import axios from 'axios'
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;

Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(api)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
