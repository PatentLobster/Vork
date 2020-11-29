import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App.vue'
import store from './store'
// import Home from "@/views/Home";
import Settings from "@/views/Settings";
import Single from "@/views/Single";
import Edit from "@/views/Edit";
import Tray from "@/views/Tray";



import VCalendar from 'v-calendar';


require('@/assets/main.scss');
require('animate.css');
Vue.config.productionTip = false;


Vue.use(VueRouter);
Vue.use(VCalendar);

const routes = [
    {path: '/', component: Tray},
    {path: '/settings', component: Settings},
    {path: '/export', component: Edit},
    {path: '/show/:date', component: Single},
    {path: '/Tray', component: Tray}
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
