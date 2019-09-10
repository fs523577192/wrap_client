<template>
<div>
    <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="15">
            <h2 class="grid-content">零部件列表</h2>
        </el-col>
        <el-col :span="5" style="text-align: right">
            <div class="grid-content">
                <el-button @click="add">添加零部件</el-button>
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
                        width="240">
                    <template slot-scope="scope">
                        <el-button @click="barcode(scope.row)"
                                   type="info" size="small">条形码</el-button>
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
}
export default {
    name: 'component-list',
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
            thiz.$router.push('/component/edit');
        },
        edit (component) {
            thiz.$router.push('/component/edit?id=' + component.id);
        },
        remove (component) {
        },
        barcode (component) {
            window.open('/component/barcode?id=' + component.id);
        }
    }
};
</script>
