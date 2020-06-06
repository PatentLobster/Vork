import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App.vue'
import store from './store'
import Home from "@/views/Home";
// import db from './datastore'
// import { remote } from 'electron'
//
// Vue.prototype.$db = remote.getGlobal('db');

// Vue.prototype.$db = db;
Vue.config.productionTip = false;

Vue.use(VueRouter);


const routes = [
  {path: '/', component: Home}
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
