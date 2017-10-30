<template>
<div>
    <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="15">
            <h2 class="grid-content">维修单列表</h2>
        </el-col>
        <el-col :span="5" style="text-align: right">
            <div class="grid-content">
                <el-button @click="add">接修</el-button>
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <el-table
                    :data="list"
                    :border="true" :stripe="true"
                    style="width: 100%">
                <el-table-column
                        width="60" prop="id"
                        label="流水号">
                </el-table-column>
                <el-table-column
                        width="60" prop="team"
                        label="组别">
                </el-table-column>
                <el-table-column
                        prop="owner"
                        label="物主">
                </el-table-column>
                <el-table-column
                        prop="mobile"
                        label="手机号">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="其他电话号">
                </el-table-column>
                <el-table-column
                        prop="school_idcode"
                        label="学号">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="维修物品">
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="状态">
                </el-table-column>
                <el-table-column
                        prop="worker"
                        label="接修人">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="操作">
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
import myAjax from '../util/ajax';

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
            loading: true
        };
    },
    methods: {
        setPage (page) {
            thiz.page = page;
            getList();
        },
        setSize (size) {
            thiz.size = size;
            getList();
        },
        add () {
            thiz.$router.push('/jiadian/order/edit?activityId='
                    + thiz.activityId);
        },
        edit (order) {
            thiz.$router.push('/jiadian/order/edit?id=' + order.id);
        },
        remove (order) {
            thiz.$confirm('确定要删除该维修单吗？', '确认', {
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
        }
    }
};
</script>
