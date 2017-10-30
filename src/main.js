// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Router from 'vue-router';

import App from './App';

import BoxList from './box/List';
import ComponentList from './component/List';
import ComponentEdit from './component/Edit';

import ActivityList from './jiadian/List';
import ActivityEdit from './jiadian/Edit';
import OrderList from './jiadian/OrderList';
import OrderEdit from './jiadian/OrderEdit';

Vue.use(Router);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    router: new Router({
        routes: [
            { path: '/box', component: BoxList },
//            { path: 'box/edit', component: },
            { path: '/component', component: ComponentList },
            { path: '/component/edit', component: ComponentEdit },
            { path: '/jiadian/activity', component: ActivityList },
            {
                path: '/jiadian/activity/edit',
                component: ActivityEdit,
                props: function (route) {
                    const id = route.query.id;
                    console.log(id);
                    const idNum = Number(id);
                    if (idNum > 0) {
                        return {id: idNum};
                    }
                    return {id: ''};
                }
            },
            { path: '/jiadian/activity', component: ActivityList },
            {
                path: '/jiadian/order',
                component: OrderList,
                props: function (route) {
                    const activityId = route.query.activityId;
                    const activityIdNum = Number(activityId);
                    if (activityIdNum > 0) {
                        return {activityId: activityIdNum};
                    }
                    return {activityId: ''};
                }
            },
            {
                path: '/jiadian/order/edit',
                component: OrderEdit,
                props: function (route) {
                    const id = route.query.id;
                    const idNum = Number(id);
                    if (idNum > 0) {
                        return {
                            id: idNum,
                            activityId: ''
                        };
                    }
                    const activityId = route.query.activityId;
                    const activityIdNum = Number(activityId);
                    if (activityIdNum > 0) {
                        return {
                            id: '',
                            activityId: activityIdNum
                        };
                    }
                    return {
                        id: '',
                        activityId: '',
                    };
                }
            },
        ]
    }),
    components: { App },
});
