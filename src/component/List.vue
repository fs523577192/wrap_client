<template>
<div>
    <el-row>
        <el-col :span="12"><div class="grid-content">零部件列表</div></el-col>
        <el-col :span="12"><div class="grid-content"><el-button>添加零部件</el-button></div></el-col>
    </el-row>
</div>
</template>

<script>
let thiz;
export default {
    name: 'component-list',
    mounted () {
        thiz = this;
    },
    data: {
    },
    methods: {
    }
};
</script>