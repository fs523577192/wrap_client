<template>
<div>
    <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="15">
            <h2 class="grid-content">维修活动列表</h2>
        </el-col>
        <el-col :span="5" style="text-align: right">
            <div class="grid-content">
                <el-button @click="add">添加维修活动</el-button>
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
                        width="120" prop="academicYear"
                        label="学年">
                </el-table-column>
                <el-table-column
                        width="90" prop="semesterInfo"
                        label="学期">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="名称">
                </el-table-column>
                <el-table-column
                        width="120" prop="begin_time_info"
                        label="开始时间">
                </el-table-column>
                <el-table-column
                        width="120" prop="end_time_info"
                        label="结束时间">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="操作">
                    <template scope="scope">
                        <el-button @click="detail(scope.row)"
                                   size="small">查看</el-button>
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
        url: '/jiadian/activity',
        params: {
            page: thiz.page,
            size: thiz.size
        }
    }).then(function (json) {
        thiz.$store.commit('setLoading', false);
        json.data.list.forEach(function (item) {
            item.academicYear = item.year + ' - ' + (item.year + 1);
            item.semesterInfo = '第' + item.semester + '学期';
        });
        thiz.list = json.data.list;
        thiz.total = json.data.total;
        thiz.page = json.data.page;
    }).catch(function (response) {
        console.log(response);
    });
}
export default {
    name: 'activity-list',
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
            thiz.$router.push('/jiadian/activity/edit');
        },
        edit (activity) {
            thiz.$router.push('/jiadian/activity/edit?id=' + activity.id);
        },
        detail (activity) {
            thiz.$router.push('/jiadian/order?activityId=' + activity.id);
        },
        remove (activity) {
            thiz.$confirm('确定要删除该维修活动吗？', '确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                thiz.$http.delete('/jiadian/activity?id=' + activity.id
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
