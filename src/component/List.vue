<template>
<div>
    <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="15">
            <h2 class="grid-content">零部件列表</h2>
        </el-col>
        <el-col :span="5">
            <div class="grid-content">
                <el-button @click="add">添加零部件</el-button>
            </div>
        </el-col>
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
        add () {
            thiz.$router.push('/component/edit');
        }
    }
};
</script>