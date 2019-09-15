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

import axios from 'axios';

const getComponent = function (thiz) {
    thiz.$store.commit('setLoading', true);
    axios({
        method: 'GET',
        url: '/component/id',
        data: {
            id: thiz.id,
        }
    }).then(function (response) {
        thiz.$store.commit('setLoading', false);
        
        const json = response.data;
        thiz.name = json.data.name;
    }).catch(function (response) {
        console.log(response);
    });
};
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
            if (this.name.trim() === '') {
                this.nameError = '';
                return;
            }
            const component = { name: this.name };
            let promise;
            if (this.id > 0) {
                component.id = this.id;
                promise = axios({
                    method: 'PATCH',
                    url: '/component',
                    data: component
                });
            } else {
                promise = axios({
                    method: 'POST',
                    url: '/component',
                    data: component
                });
            }
            promise.then((response) => {
                if (0 === response && response.data && response.data.code) {
                    this.$router.back();
                } else {
                    this.nameError = response && response.data && typeof(response.data.message) === 'string' ?
                            response.data.message : '发生了未知错误';
                }
            }).catch(function (response) {
                console.log(response);
            });
        },
        cancel () {
            this.$router.back();
        }
    },
    mounted () {
        if (this.id) {
            getComponent(this);
        }
    }
};
</script>
