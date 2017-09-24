<template>
    <div>
        <el-row>
            <el-col :span="20">
                <h2 class="grid-content" v-if="id">编辑零部件</h2>
                <h2 class="grid-content" v-else>添加零部件</h2>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="20">
                <el-form label-width="80px" @submit.native.stop.prevent="submit">
                    <el-form-item label="名称">
                        <el-input v-model="name" :maxlength="100"></el-input>
                    </el-form-item>
                    <el-form-item v-if="nameError.length > 0">
                        <el-alert :title="nameError" type="warning" :closable="false">
                        </el-alert>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submit"
                                :disabled="name.length <= 0">确认</el-button>
                        <el-button @click="cancel">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item.vue";

    let thiz;
    export default {
        components: {ElFormItem},
        name: 'component-edit',
        props: {
            id: {
                validator (val) {
                    return '' === val || (Number.isInteger(val) && val > 0);
                }
            }
        },
        data () {
            return {
                name: '',
                nameError: '',
            };
        },
        methods: {
            submit () {
                if (thiz.name.trim() === '') {
                    thiz.nameError = '';
                    return;
                }
                let component = { name: thiz.name };
                let promise;
                if (thiz.id > 0) {
                    component.id = thiz.id;
                    promise = thiz.$http.patch('/component', component);
                } else {
                    promise = thiz.$http.post('/component', component);
                }
                promise.then(function (response) {
                    return response.json();
                }).then(function (result) {
                    if (0 === result.code) {
                    } else {
                        thiz.nameError = result.message;
                    }
                }).catch(function (response) {});
            },
            cancel () {
                this.$router.back();
            }
        },
        mounted () {
            thiz = this;
        }
    };
</script>
