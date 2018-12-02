import Vue from "vue";
import Vuex from 'vuex'
import iview from 'iview'
import VueRouter from 'vue-router'
import VueDraggable from 'vue-draggable'

import App from "./App.vue"
import getRouter from './router.js'
import storeObj from './stores'

//过滤器
import xiaoshu from './filters/xiaoshu'
import getyear from './filters/getyear'
import qianfenfu from './filters/qianfenfu'

import Loading from './components/Loading.vue'
import SetAvatar from './components/changeAvatar/SetAvatar.vue'

Vue.use(Vuex);
Vue.use(iview);
Vue.use(VueRouter);
Vue.use(VueDraggable);

Vue.filter("xiaoshu", xiaoshu);
Vue.filter("getyear", getyear);
Vue.filter("qianfenfu", qianfenfu);

Vue.component("Loading", Loading);
Vue.component("SetAvatar", SetAvatar);

const store = new Vuex.Store(storeObj);

new Vue({
    el : "#app",
    render(h){
        return h(App)
    },
    router : getRouter(store),
    store 
});