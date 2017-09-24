// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Router from 'vue-router';

import App from './App';

import BoxList from './box/List';
import ComponentList from './component/List';
import ComponentEdit from './component/Edit';

Vue.use(Router);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    router: new Router({
        routes: [
            { path: '/box', component: BoxList },
//            { path: 'box/edit', component: },*/
            { path: '/component', component: ComponentList },
            { path: '/component/edit', component: ComponentEdit }
        ]
    }),
    components: { App },
});
