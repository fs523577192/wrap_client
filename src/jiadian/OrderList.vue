<template>
<div>
    <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="15">
            <h2 class="grid-content">维修单列表</h2>
        </el-col>
        <el-col :span="5" style="text-align: right">
            <div class="grid-content">
                <el-button @click="back">返回</el-button>
                <el-button type="primary" @click="add">接修</el-button>
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-card class="box-card">
            <div class="search-header" @click="searching = !searching">
                <i :class="'el-icon-caret-' + (searching ? 'top' : 'bottom')"></i>
                <b>查询</b>
            </div>
            <el-collapse-transition><div v-show="searching">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="按">
                        <el-select v-model="searchKey">
                            <el-option label="手机号" value="mobile"></el-option>
                            <el-option label="物主姓名" value="owner"></el-option>
                            <el-option label="维修物品" value="name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="搜素">
                        <el-input v-model="searchContent"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search"
                                :disabled="searchContent.length <= 0">查询</el-button>
                    </el-form-item>
                </el-form>
            </div></el-collapse-transition>
        </el-card>
    </el-row>
    <el-row>
        <el-col :span="24">
            <el-table
                    :data="list" @sort-change="sortChange"
                    :border="true" :stripe="true"
                    style="width: 100%">
                <el-table-column
                        width="70" prop="id"
                        sortable="custom" label="流水号">
                </el-table-column>
                <el-table-column
                        width="50" prop="team"
                        label="组别">
                </el-table-column>
                <el-table-column
                        prop="owner"
                        sortable="custom" label="物主">
                </el-table-column>
                <el-table-column
                        prop="mobile"
                        sortable="custom" label="手机号">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="其他电话号">
                </el-table-column>
                <!-- el-table-column
                        prop="school_idcode"
                        label="学号">
                </el-table-column -->
                <el-table-column
                        prop="name"
                        sortable="custom" label="维修物品">
                </el-table-column>
                <el-table-column
                        width="100" prop="status"
                        label="状态">
                </el-table-column>
                <el-table-column
                        prop="worker"
                        label="接修人">
                </el-table-column>
                <el-table-column
                        width="140" class-name="operation"
                        prop="address" label="操作">
                    <template scope="scope">
                        <el-button @click="edit(scope.row)"
                                   size="small">编辑</el-button>
                        <el-button @click="remove(scope.row)"
                                   type="danger" size="small">删除</el-button>
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
import Vue from 'vue';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import myAjax from '../util/ajax';

Vue.component(CollapseTransition.name, CollapseTransition);

let thiz;
function getList () {
    thiz.$store.commit('setLoading', true);
    myAjax(thiz, {
        method: 'GET',
        url: '/jiadian/order',
        params: {
            activityId: thiz.activityId,
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
}
export default {
    name: 'order-list',
    props: {
        activityId: Number,
    },
    mounted () {
        thiz = this;
        getList();
    },
    data () {
        return {
            total: 0,
            page: 1,
            size: 10,
            list: [],
            orderBy: 'id',
            orderDirection: 'DESC',
            searching: false,
            searchKey: 'mobile',
            searchContent: '',
            loading: true
        };
    },
    methods: {
        search () {
        },
        sortChange (options) {
            this.orderBy = options.prop || 'id';
            if (/^asc/i.test(options.order)) {
                this.orderDirection = 'ASC';
            } else {
                this.orderDirection = 'DESC';
            }
        },
        setPage (page) {
            this.page = page;
            getList();
        },
        setSize (size) {
            this.size = size;
            getList();
        },
        add () {
            this.$router.push('/jiadian/order/edit?activityId='
                    + thiz.activityId);
        },
        edit (order) {
            this.$router.push('/jiadian/order/edit?id=' + order.id);
        },
        remove (order) {
            this.$confirm('确定要删除该维修单吗？', '确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                thiz.$http.delete('/jiadian/order?id=' + order.id
                ).then(function (response) {
                    return response.json();
                }).then(function (result) {
                    if (0 === result.code) {
                        getList();
                    }
                }).catch(function (response) {
                    console.log(response);
                });
            }).catch(function (e) {
                console.log(e);
            });
        },
        back () {
            this.$router.back();
        }
    },
    watch: {
        orderBy (value) {
            getList();
        },
        orderDirection (value) {
            getList();
        }
    }
};
</script>

<style>
.box-card {
    margin-bottom: 1em;
}
.search-header {
    cursor: pointer;
}
.el-form--inline {
    margin-top: 1em;
}
.el-table .cell.operation {
    padding-right: 0;
}
</style>
