<template>
<article id="app"
         v-loading.fullscreen.lock="$store.state.loading"
         element-loading-text="加载中">
    <el-menu default-active="validation" router="true" mode="horizontal">
        <el-menu-item index="validation">装箱验证</el-menu-item>
        <el-menu-item index="box">出货单管理</el-menu-item>
        <el-menu-item index="component">零部件管理</el-menu-item>
    </el-menu>
    <router-view></router-view>
</article>
</template>

<script>
import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';
import Element from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

import myAjax from './util/ajax.js';
import loginFilter from './util/login-filter.js';
import './util/storage.js';

Vue.use(Vuex);
Vue.use(Router);
Vue.use(Element);

let thiz;
const states = new Vuex.Store({
    state: {
        loading: false
    },
    mutations: {
        setLoading(state, loading) {
            state.loading = loading;
        }
    },
    getters: {
    }
});
export default {
    name: 'app',
    data () {
        return {
            loading: true
        };
    },
    store: states,
    mounted () {
        thiz = this;
        thiz.$router.beforeEach(function (to, from, next) {
            thiz.$store.commit('setLoading', true);
            next();
        });
        thiz.$router.afterEach(function () {
            thiz.$store.commit('setLoading', false);
        });
    }
};
</script>

<style lang="css">
</style>

<style lang="css" scoped>
</style>

<style lang="less">
</style>
