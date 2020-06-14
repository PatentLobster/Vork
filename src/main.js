import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App.vue'
import store from './store'
import Home from "@/views/Home";
import Settings from "@/views/Settings";
import Single from "@/views/Single";

require('@/assets/main.scss');
require('animate.css');
Vue.config.productionTip = false;

Vue.use(VueRouter);


const routes = [
    {path: '/', component: Home},
    {path: '/settings', component: Settings},
    {path: '/show/:date', component: Single}
];


const router = new VueRouter({
    base: '/',
    routes
});


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
