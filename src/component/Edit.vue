<template>
    <div>
        <el-row>
            <el-col :span="20">
                <h2 class="grid-content" v-if="id">编辑零部件</h2>
                <h2 class="grid-content">添加零部件</h2>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="20">
                <el-form label-width="80px">
                    <el-form-item label="名称">
                        <el-input v-model="name" maxlength="100"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submit">确认</el-button>
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
                if (this.name.trim() === '') {
                    this.nameError = '';
                }
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