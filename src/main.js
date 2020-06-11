import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App.vue'
import store from './store'
import Home from "@/views/Home";
import Single from "@/views/Single";

require('@/assets/main.scss');
require('animate.css');
Vue.config.productionTip = false;

Vue.use(VueRouter);


const routes = [
    {path: '/', component: Home},
    {path: '/show/:date', component: Single}
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
