import Vue from 'vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue';
import router from './router';
import store from './store';
import './util/storage.js';

Vue.use(Element);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

router.beforeEach(function (to, from, next) {
    store.commit('setLoading', true);
    next();
});
router.afterEach(function () {
    store.commit('setLoading', false);
});