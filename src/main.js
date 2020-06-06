import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App.vue'
import store from './store'
import Home from "@/views/Home";

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
