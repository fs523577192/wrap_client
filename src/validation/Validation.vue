<template>
<div>
    <h3>装箱验证</h3>
    <el-row :gutter="40">
        <el-col :span="12">
            <el-form label-width="160px" @submit.native.stop.prevent="submit">
                <el-form-item label="请扫描装箱单条码">
                    <el-input v-model="code" :maxlength="10"></el-input>
                </el-form-item>
                <el-form-item v-if="codeError.length > 0">
                    <el-alert :title="codeError" type="warning" :closable="false">
                    </el-alert>
                </el-form-item>
                <el-form-item>
                    <el-button @click="cancel" :disabled="!validating">重新验证</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="12">
            <el-form label-width="160px" @submit.native.stop.prevent="submit">
                <el-form-item label="请扫描零部件条码">
                    <el-input v-model="code1" :maxlength="10"></el-input>
                </el-form-item>
                <el-form-item v-if="code1Error.length > 0">
                    <el-alert :title="code1Error" type="warning" :closable="false">
                    </el-alert>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
    <el-row>
    </el-row>
</div>
</template>
<script>
import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item.vue";
import myAjax from '../util/ajax';

const getBox = function (thiz, id) {
    thiz.$store.commit('setLoading', true);
    return myAjax(thiz, {
        method: 'GET',
        url: '/box/components',
        params: {
            id
        }
    }).then(function (json) {
        thiz.$store.commit('setLoading', false);
        thiz.name = json.data.box.name;
        thiz.components = {};
        thiz.componentList = json.data.components;
        thiz.componentList.forEach(function (item, index) {
            item.index = index;
            thiz.components[item.component.id.toString()] = item;
        });
    }).catch(function (response) {
        console.log(response);
    });
};
export default {
    components: {ElFormItem},
    name: 'validation',
    data () {
        return {
            code: '',
            codeError: '',
            validating: false,
            code1: '',
            code1Error: '',
            components: {},
            componentList: [],
        };
    },
    methods: {
        cancel () {
            this.components = {};
            this.componentList = [];
        }
    },
    watch: {
        code (val) {
            if (val === '') {
                this.codeError = '';
                return;
            }
            const codeValid = /^B\d{8}$/.test(val);
            if (val !== 'B00000000' && codeValid) {
                getBox(this, val.substring(1));
            } else {
                this.codeError = '装箱单条码无效，请重新输入';
            }
        }
    }
};
</script>
<style>
</style>
