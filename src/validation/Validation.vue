<template>
<div>
    <h3>装箱验证</h3>
    <el-row :gutter="40">
        <el-col :span="12">
            <el-form label-width="160px" @submit.native.stop.prevent="submit">
                <el-form-item label="请扫描装箱单条码">
                    <el-input v-model="code" :maxlength="10" ref="codeInput"
                            :disabled="validating"></el-input>
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
            <el-form label-width="160px" v-if="validating"
                    @submit.native.stop.prevent="submit">
                <el-form-item label="请扫描零部件条码">
                    <el-input v-model="codeComponent" :maxlength="10" ref="codeComponentInput"
                            :disabled="validated >= componentNumber"></el-input>
                    <audio id="warnSound" src="static/warn.mp3" preload="auto" />
                    <audio id="successSound" src="static/success.wav" preload="auto" />
                </el-form-item>
                <el-form-item v-if="validated >= componentNumber">
                    <el-alert title="装箱完成" type="success" :closable="false">
                    </el-alert>
                </el-form-item>
                <el-form-item v-if="codeComponentError.length > 0">
                    <el-alert :title="codeComponentError" type="warning" :closable="false">
                    </el-alert>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="12">
            <el-table
                    :data="listLeft"
                    :border="true" :stripe="true"
                    style="width: 100%">
                <el-table-column
                        prop="component.name"
                        label="名称">
                </el-table-column>
                <el-table-column
                        prop="number"
                        label="应有数量"
                        width="170">
                </el-table-column>
                <el-table-column
                        prop="validated"
                        label="实际数量"
                        width="80">
                </el-table-column>
            </el-table>
        </el-col>
        <el-col :span="12">
            <el-table
                    :data="listRight"
                    :border="true" :stripe="true"
                    style="width: 100%">
                <el-table-column
                        prop="component.name"
                        label="名称">
                </el-table-column>
                <el-table-column
                        prop="number"
                        label="应有数量"
                        width="170">
                </el-table-column>
                <el-table-column
                        prop="validated"
                        label="实际数量"
                        width="80">
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</div>
</template>
<script>
import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item.vue";
import myAjax from '../util/ajax';

const convertComponentId = function (id) {
    var result = '' + id;
    while (result.length < 8) {
        result = '0' + result;
    }
    return 'C' + result;
};
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
        thiz.componentNumber = 0;
        thiz.validated = 0;

        thiz.listLeft = [];
        thiz.listRight = [];
        json.data.components.forEach(function (item, index) {
            item.validated = 0;
            const id = convertComponentId(item.component.id);
            thiz.components[id] = item;
            thiz.componentNumber += item.number;

            // 数组的push要放在components赋值的后面，这样
            // item的属性变化才会引起零部件列表的变化
            if (0 === (index & 1)) { // index % 2 == 0
                thiz.listLeft.push(item);
            } else {
                thiz.listRight.push(item);
            }
        });
        thiz.codeError = '';
        thiz.validating = true;
        setTimeout(function () {
            thiz.$refs.codeComponentInput.focus();
        }, 10);
    }).catch(function (response) {
        if (response.body && 20000 === response.body.code) {
            thiz.$store.commit('setLoading', false);
            thiz.codeError = '装箱单条码无效，请重新输入';
        }
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
            codeComponent: '',
            codeComponentError: '',

            selectAllTimer: 0,
            selectAllComponentTimer: 0,

            components: {},
            componentList: [],

            componentNumber: 0,
            validated: 0,

            listLeft: [],
            listRight: [],
        };
    },
    methods: {
        submit () {
            if (this.validating) {
            }
        },
        cancel () {
            this.code = '';
            this.codeComponent = '';
            this.validating = false;

            this.components = {};
            this.componentList = [];
            this.listLeft = [];
            this.listRight = [];

            this.validated = 0;
            this.componentNumber = 0;

            setTimeout(() => {
                this.$refs.codeInput.focus();
            }, 10);
        },

        selectAllIfNotValid () {
            this.selectAllTimer = 0;
            if (!this.validating) {
                const inputNode = this.$refs.codeInput.$el.querySelector('input[type="text"]');
                inputNode.setSelectionRange(0, inputNode.value.length);
            }
        },

        playSuccess () {
            if (this.validated >= this.componentNumber) {
                console.log('successSound');
                document.getElementById('successSound').play();
            }
        },
        playWarn() {
            console.log('warnSound');
            document.getElementById('warnSound').play();
        }
    },
    watch: {
        code (val) {
            if ('' === val) {
                this.codeError = '';
                return;
            }
            const codeValid = /^B\d{8}$/.test(val);
            if ('B00000000' !== val && codeValid) {
                getBox(this, val.substring(1));
            } else {
                this.codeError = '装箱单条码无效，请重新输入';
                if (!this.selectAllTimer) {
                    this.selectAllTimer = setTimeout(this.selectAllIfNotValid, 1000);
                }
            }
        },
        codeComponent (val) {
            if ('' === val) {
                this.codeComponentError = '';
                return;
            }
            const codeValid = /^C\d{8}$/.test(val);
            if ('C00000000' === val || !codeValid) {
                this.codeComponentError = '零部件条码无效，请重新输入';
                return;
            }
            const component = this.components[val];
            if (component) {
                if (component.validated < component.number) {
                    component.validated += 1;
                    this.validated += 1;
                    this.codeComponent = '';
                    this.playSuccess();
                    return;
                }
            }
            this.codeComponentError = '零部件与出货箱不匹配';
            this.playWarn();
        }
    }
};
</script>
<style>
</style>
