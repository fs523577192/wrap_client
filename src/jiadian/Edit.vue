<template>
    <div>
        <el-row>
            <el-col :span="20">
                <h2 class="grid-content" v-if="id">编辑维修活动</h2>
                <h2 class="grid-content" v-else>添加维修活动</h2>
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
                    <el-form-item label="学年">
                        <el-date-picker v-model="year" type="year"></el-date-picker>
                    </el-form-item>
                    <el-form-item v-if="yearError.length > 0">
                        <el-alert :title="yearError" type="warning" :closable="false">
                        </el-alert>
                    </el-form-item>
                    <el-form-item label="学期">
                        <el-select v-model="semester">
                            <el-option :key="1" :value="1" label="第1学期"></el-option>
                            <el-option :key="2" :value="2" label="第2学期"></el-option>
                            <el-option :key="3" :value="3" label="第3学期"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="semesterError.length > 0">
                        <el-alert :title="semesterError" type="warning" :closable="false">
                        </el-alert>
                    </el-form-item>
                    <el-form-item label="时间">
                        <el-date-picker v-model="timeRange" type="datetimerange"
                                :time-arrow-control="true"
                                range-separator=" 至 "
                                start-placeholder="开始时间"
                                end-placeholder="结束时间"></el-date-picker>
                    </el-form-item>
                    <el-form-item v-if="timeError.length > 0">
                        <el-alert :title="timeError" type="warning" :closable="false">
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
import moment from 'moment';
import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item.vue";
import myAjax from '../util/ajax';

let thiz;
const timePattern = 'YYYY-MM-DD HH:mm:ss';
const validateForm = function () {
    let invalid = false;
    if (thiz.name.trim() === '') {
        thiz.nameError = '活动名称不能为空';
        invalid = true;
    }
    return invalid;
};
const getActivity = function () {
    thiz.$store.commit('setLoading', true);
    myAjax(thiz, {
        method: 'GET',
        url: '/jiadian/activity/id',
        params: {
            id: thiz.id,
        }
    }).then(function (json) {
        thiz.$store.commit('setLoading', false);
        thiz.name = json.data.name;
        thiz.year = new Date();
        thiz.year.setFullYear(json.data.year);
        thiz.semester = json.data.semester;
        thiz.timeRange = [
            moment(json.data.begin_time_info).toDate(),
            moment(json.data.end_time_info).toDate(),
        ];
    }).catch(function (response) {
        console.log(response);
    });
};
export default {
    components: {ElFormItem},
    name: 'activity-edit',
    props: {
        id: {
            validator (val) {
                return '' === val || (Number.isInteger(val) && val > 0);
            }
        }
    },
    data () {
        const first = new Date();
        first.setHours(9);
        first.setMinutes(0);
        first.setSeconds(0);
        const last = new Date();
        last.setHours(17);
        last.setMinutes(0);
        last.setSeconds(0);
        return {
            name: '',
            nameError: '',
            year: first,
            yearError: '',
            semester: 1,
            semesterError: '',
            timeRange: [first, last],
            timeError: '',
        };
    },
    methods: {
        submit () {
            if (validateForm()) {
                return;
            }
            let activity = {
                name: thiz.name,
                year: thiz.year.getFullYear(),
                semester: thiz.semester,
                beginTime: moment(thiz.timeRange[0]).format(timePattern),
                endTime: moment(thiz.timeRange[1]).format(timePattern),
            };
            let promise;
            if (thiz.id > 0) {
                activity.id = thiz.id;
                promise = thiz.$http.patch('/jiadian/activity', activity);
            } else {
                promise = thiz.$http.post('/jiadian/activity', activity);
            }
            promise.then(function (response) {
                return response.json();
            }).then(function (result) {
                if (0 === result.code) {
                    thiz.$router.back();
                } else {
                    thiz.nameError = result.message;
                }
            }).catch(function (response) {});
        },
        cancel () {
            this.$router.back();
        }
    },
    mounted () {
        thiz = this;
        if (thiz.id) {
            getActivity();
        }
    },
    watch: {
        year (value) {
            console.log('year: ' + value);
        },
        timeRange (value) {
            console.log(value);
        }
    }
};
</script>
