<template>
<article id="app" style="max-width: 1000px; margin: auto"
         v-loading.fullscreen.lock="$store.state.loading"
         element-loading-text="加载中">
    <el-menu default-active="validation" :router="true" mode="horizontal">
        <el-menu-item index="/validation">装箱验证</el-menu-item>
        <el-menu-item index="/box">出货单管理</el-menu-item>
        <el-menu-item index="/component">零部件管理</el-menu-item>
    </el-menu>
    <router-view></router-view>
</article>
</template>