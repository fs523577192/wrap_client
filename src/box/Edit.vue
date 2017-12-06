<template>
<div>
    <el-row type="flex" :gutter="20">
        <el-col :span="12">
            <h3 v-if="id > 0">编辑出货箱</h3>
            <h3 v-else>添加出货箱</h3>
            <el-form @submit.native.stop.prevent="submit">
                <el-form-item label="名称">
                    <el-input v-model="name" :maxlength="100"></el-input>
                </el-form-item>
                <el-form-item v-if="nameError.length > 0">
                    <el-alert :title="nameError" type="warning" :closable="false">
                    </el-alert>
                </el-form-item>
                <el-form-item label="已选零部件（要删除请将数量减为0）">
                    <el-table
                            :data="componentList"
                            :border="true" :stripe="true"
                            style="width: 100%">
                        <el-table-column
                                prop="component.name"
                                label="名称">
                        </el-table-column>
                        <el-table-column
                                prop="number"
                                label="数量"
                                width="120">
                            <template scope="scope">
                                <el-input-number :value="scope.row.number"
                                        controls-position="right"
                                        @change="changeNumber($event, scope.row.index)"
                                        :min="0" :max="100000"></el-input-number>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit"
                            :disabled="name.length <= 0 || componentList.length <= 0">确认</el-button>
                    <el-button @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="12">
            <h3>选择零部件</h3>
            <el-table
                    :data="list"
                    :border="true" :stripe="true"
                    style="width: 100%">
                <el-table-column
                        prop="create_time_info"
                        label="添加时间"
                        width="170">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="名称">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="操作"
                        width="80">
                    <template scope="scope">
                        <el-button v-if="modified && !components[scope.row.id.toString()]"
                                @click="add(scope.row)"
                                size="small">添加</el-button>
                    </template>
                </el-table-column>
                <el-pagination
                        v-if="list.length"
                        slot="append"
                        @size-change="setSize"
                        @current-change="setPage"
                        :current-page="page"
                        :page-sizes="[5, 10, 15, 20, 25, 30]"
                        :page-size="size"
                        layout="sizes, prev, pager, next, jumper, total"
                        :total="total"
                        style="padding: .8em; width: 100%">
                </el-pagination>
            </el-table>
        </el-col>
    </el-row>
</div>
</template>
<script>
import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item.vue";
import myAjax from '../util/ajax';

const getBox = function (thiz) {
    thiz.$store.commit('setLoading', true);
    return myAjax(thiz, {
        method: 'GET',
        url: '/box/components',
        params: {
            id: thiz.id
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
const getComponentList = function (thiz) {
    thiz.$store.commit('setLoading', true);
    return myAjax(thiz, {
        method: 'GET',
        url: '/component',
        params: {
            page: thiz.page,
            size: thiz.size
        }
    }).then(function (json) {
        thiz.$store.commit('setLoading', false);
        thiz.list = json.data.list;
        thiz.total = json.data.total;
        thiz.page = json.data.page;
    }).catch(function (response) {
        console.log(response);
    });
};
export default {
    components: {ElFormItem},
    name: 'box-edit',
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
            components: {},
            componentList: [],
            total: 0,
            page: 1,
            size: 10,
            list: [],
            modified: 1,
        };
    },
    mounted () {
        if (this.id) {
            getComponentList(this).then(getBox(this));
        } else {
            getComponentList(this);
        }
    },
    methods: {
        submit () {
            const thiz = this;
            if (thiz.name.trim() === '') {
                thiz.nameError = '';
                return;
            }
            const box = {
                name: thiz.name,
                components: {},
            };
            thiz.componentList.forEach(function (item) {
                box.components[item.component.id.toString()] = item.number;
            });
            box.components = JSON.stringify(box.components);
            let promise;
            thiz.$store.commit('setLoading', true);
            if (thiz.id > 0) {
                box.id = thiz.id;
                promise = thiz.$http.patch('/box', box);
            } else {
                promise = thiz.$http.post('/box', box);
            }
            promise.then(function (response) {
                return response.json();
            }).then(function (result) {
                if (0 === result.code) {
                    thiz.$router.back();
                } else {
                    thiz.nameError = result.message;
                }
            }).catch(function (response) {
                console.log(response);
            });
        },
        cancel () {
            this.$router.back();
        },
        setPage (page) {
            this.page = page;
            getComponentList(this);
        },
        setSize (size) {
            this.size = size;
            getComponentList(this);
        },
        add (component) {
            let item = this.components[component.id.toString()];
            if (!item) {
                item = {
                    component,
                    number: 1,
                    index: this.componentList.length,
                };
                this.components[component.id.toString()] = item;
                this.componentList.push(item);
                this.modified += 1;
            } else {
                this.componentList[item.index].component = component;
            }
        },
        changeNumber (number, index) {
            if (number <= 0) {
                const name = this.componentList[index].component.name;
                this.$confirm('要取消选择“' + name + '”吗？', '确认', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const id = this.componentList[index].component.id;
                    delete this.components[id.toString()];
                    this.componentList.splice(index, 1);
                    this.modified += 1;
                }).catch(() => {
                    this.componentList[index].number = 1;
                });
            }
            this.componentList[index].number = number;
        }
    }
};
</script>
<style>
.el-input-number {
    width: 100px;
}
.el-input-number.is-controls-right .el-input__inner {
    padding-left: 10px;
    padding-right: 38px;
}
.el-input-number__decrease, .el-input-number__increase {
    width: 30px;
}
</style>
