// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Router from 'vue-router';

import App from './App';

import ComponentList from './component/list';
import ComponentEdit from './component/edit';

Vue.use(Router);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    router: new Router({
        routes: [
            /* { path: 'box', component: },
            { path: 'box/edit', component: },*/
            { path: '/component', component: ComponentList },
            { path: '/component/edit', component: ComponentEdit }
        ]
    }),
    components: { App },
});
