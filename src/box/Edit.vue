<template>
<div class="my-container">
    <el-row type="flex" :gutter="20">
        <el-col :span="8">
            <h3 v-if="id > 0">编辑出货箱</h3>
            <h3 v-else>添加出货箱</h3>
            <el-form label-width="80px" @submit.native.stop.prevent="submit">
                <el-form-item label="名称">
                    <el-input v-model="name" :maxlength="100"></el-input>
                </el-form-item>
                <el-form-item v-if="nameError.length > 0">
                    <el-alert :title="nameError" type="warning" :closable="false">
                    </el-alert>
                </el-form-item>
                <el-form-item>

                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit"
                            :disabled="name.length <= 0">确认</el-button>
                    <el-button @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="16">
            <h3>选择零部件</h3>
            <el-table
                    :data="list"
                    :border="true" :stripe="true"
                    style="width: 100%">
                <el-table-column
                        prop="create_time_info"
                        label="添加时间"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="名称">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="操作"
                        width="100">
                    <template scope="scope">
                        <el-button @click="add(scope.row)"
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
            total: 0,
            page: 1,
            size: 10,
            list: [],
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
        }
    }
};
</script>
<style>
.my-container {
    margin-top: 1em;
}
</style>
