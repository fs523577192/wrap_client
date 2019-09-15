import Vue from 'vue';
import Router from 'vue-router';

import BoxList from './box/List';
import BoxEdit from './box/Edit';
import ComponentList from './component/List';
import ComponentEdit from './component/Edit';
import Validation from './validation/Validation';

Vue.use(Router);

const idRouteProp = function (route) {
    const id = route.query.id;
    console.log(id);
    const idNum = Number(id);
    if (idNum > 0) {
        return {id: idNum};
    }
    return {id: ''};
};

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        { path: '/box', component: BoxList },
        {
            path: '/box/edit',
            component: BoxEdit,
            props: idRouteProp
        },
        { path: '/component', component: ComponentList },
        {
            path: '/component/edit',
            component: ComponentEdit,
            props: idRouteProp
        },
        { path: '/validation', component: Validation }
    ]
});