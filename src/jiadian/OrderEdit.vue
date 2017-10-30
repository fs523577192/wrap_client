<template>
    <div>
        <el-row>
            <el-col :span="20">
                <h2 class="grid-content" v-if="id">编辑维修单</h2>
                <h2 class="grid-content" v-else>接修</h2>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="20">
                <el-form label-width="140px" @submit.native.stop.prevent="submit">
                    <el-form-item label="组别" :required="true">
                        <el-select v-model="team">
                            <el-option key="A" value="A" label="A"></el-option>
                            <el-option key="B" value="B" label="B"></el-option>
                            <el-option key="C" value="C" label="C"></el-option>
                            <el-option key="D" value="D" label="D"></el-option>
                            <el-option key="E" value="E" label="E"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="维修物品名称" :required="true">
                        <el-input v-model="name" :maxlength="30"></el-input>
                    </el-form-item>
                    <el-form-item v-if="nameError.length > 0">
                        <el-alert :title="nameError" type="warning" :closable="false">
                        </el-alert>
                    </el-form-item>
                    <el-form-item label="物主姓名" :required="true">
                        <el-input v-model="owner" :maxlength="30"></el-input>
                    </el-form-item>
                    <el-form-item v-if="ownerError.length > 0">
                        <el-alert :title="ownerError" type="warning" :closable="false">
                        </el-alert>
                    </el-form-item>
                    <el-form-item label="物主手机号">
                        <el-input v-model="mobile" :maxlength="11"></el-input>
                    </el-form-item>
                    <el-form-item v-if="mobileError.length > 0">
                        <el-alert :title="mobileError" type="warning" :closable="false">
                        </el-alert>
                    </el-form-item>
                    <el-form-item label="物主固话（无手机）">
                        <el-input v-model="phone" :maxlength="20"></el-input>
                    </el-form-item>
                    <el-form-item v-if="phoneError.length > 0">
                        <el-alert :title="phoneError" type="warning" :closable="false">
                        </el-alert>
                    </el-form-item>
                    <el-form-item label="物主学号">
                        <el-input v-model="schoolIdCode" :maxlength="10"></el-input>
                    </el-form-item>
                    <el-form-item v-if="schoolIdCodeError.length > 0">
                        <el-alert :title="schoolIdCodeError" type="warning" :closable="false">
                        </el-alert>
                    </el-form-item>
                    <el-form-item label="物主Email">
                        <el-input v-model="email" :maxlength="60"></el-input>
                    </el-form-item>
                    <el-form-item v-if="emailError.length > 0">
                        <el-alert :title="emailError" type="warning" :closable="false">
                        </el-alert>
                    </el-form-item>
                    <el-form-item label="状态" :required="true">
                        <el-select v-model="status">
                            <el-option key="normal" value="待维修" label="待维修"></el-option>
                            <el-option key="mend" value="维修中" label="维修中"></el-option>
                            <el-option key="succeed" value="维修成功" label="维修成功"></el-option>
                            <el-option key="fail" value="维修失败" label="维修失败"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="接修人">
                        <el-input v-model="worker" :maxlength="30"></el-input>
                    </el-form-item>
                    <el-form-item v-if="workerError.length > 0">
                        <el-alert :title="workerError" type="warning" :closable="false">
                        </el-alert>
                    </el-form-item>
                    <el-form-item label="物品故障描述">
                        <el-input v-model="reason" type="textarea"
                                :rows="3"></el-input>
                    </el-form-item>
                    <el-form-item v-if="reasonError.length > 0">
                        <el-alert :title="reasonError" type="warning" :closable="false">
                        </el-alert>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submit"
                                :disabled="cannotSubmit">确认</el-button>
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
import {isEmail} from '../util/validator/email';
import {isMobile} from '../util/validator/mobile';

let thiz, tempStatus = '待维修';
const getOrder = function () {
    thiz.$store.commit('setLoading', true);
    myAjax(thiz, {
        method: 'GET',
        url: '/jiadian/order/id',
        params: {
            id: thiz.id,
        }
    }).then(function (json) {
        thiz.$store.commit('setLoading', false);
        thiz.name = json.data.name;
        thiz.owner = json.data.owner;
        thiz.team = json.data.team;
        thiz.mobile = json.data.mobile || '';
        thiz.phone = json.data.phone || '';
        thiz.email = json.data.email || '';
        thiz.schoolIdCode = json.data.schoolIdCode || '';
        thiz.worker = json.data.worker || '';
        thiz.reason = json.data.reason || '';
        thiz.status = tempStatus = json.data.status;
        console.log(tempStatus);
    }).catch(function (response) {
        console.log(response);
    });
};
const validateForm = function () {
    let invalid = false;
    thiz.name = thiz.name.trim();
    if ('' === thiz.name) {
        thiz.nameError = '请输入维修物品名称';
        invalid = true;
    } else if (thiz.name.length < 2) {
        thiz.nameError = '维修物品名称至少2个字符';
        invalid = true;
    }
    thiz.owner = thiz.owner.trim();
    if ('' === thiz.owner) {
        thiz.ownerError = '请输入物主的姓名';
        invalid = true;
    } else if (thiz.owner.length < 2) {
        thiz.ownerError = '物主的姓名至少2个字符';
        invalid = true;
    }
    if ('' === thiz.mobile) {
        if ('' === thiz.phone) {
            thiz.phoneError = '手机号和固话号不能同时为空';
            invalid = true;
        }
    } else if (!isMobile(thiz.mobile)) {
        thiz.mobileError = '手机号格式不正确';
        invalid = true;
    }
    thiz.phone = thiz.phone.trim();
    if ('' !== thiz.phone && thiz.phone.length < 3) {
        thiz.phoneError = '固话号至少3个字符';
        invalid = true;
    }
    thiz.email = thiz.email.trim();
    if ('' !== thiz.email && !isEmail(thiz.email)) {
        thiz.emailError = 'Email格式不正确';
        invalid = true;
    }
    thiz.schoolIdCode = thiz.schoolIdCode.trim();
    if ('' !== thiz.schoolIdCode && thiz.schoolIdCode.length < 6) {
        thiz.schoolIdCodeError = '学号至少6个字符';
        invalid = true;
    }
    thiz.worker = thiz.worker.trim();
    if ('' !== thiz.worker && thiz.worker.length < 2) {
        thiz.workerError = '接修人的姓名至少2个字符';
        invalid = true;
    }
    thiz.reason = thiz.reason.trim();
    return invalid;
};
const getOrderParam = function () {
    const order = {
        activityId: thiz.activityId,
        name: thiz.name,
        owner: thiz.owner,
        team: thiz.team,
    };
    if ('' !== thiz.mobile) {
        order.mobile = thiz.mobile;
    }
    if ('' !== thiz.phone) {
        order.phone = thiz.phone;
    }
    if ('' !== thiz.email) {
        order.email = thiz.email;
    }
    if ('' !== thiz.schoolIdCode) {
        order.schoolIdCode = thiz.schoolIdCode;
    }
    if ('' !== thiz.worker) {
        order.worker = thiz.worker;
    }
    if ('' !== thiz.reason) {
        order.reason = thiz.reason;
    }
    return order;
};
export default {
    components: {ElFormItem},
    name: 'order-edit',
    props: {
        id: {
            validator (val) {
                return '' === val || (Number.isInteger(val) && val > 0);
            }
        },
        activityId: {
            validator (val) {
                return '' === val || (Number.isInteger(val) && val > 0);
            }
        }
    },
    data () {
        return {
            name: '',
            nameError: '',
            team: 'A',
            teamError: '',
            owner: '',
            ownerError: '',
            mobile: '',
            mobileError: '',
            phone: '',
            phoneError: '',
            email: '',
            emailError: '',
            schoolIdCode: '',
            schoolIdCodeError: '',
            status: tempStatus,
            statusError: '',
            worker: '',
            workerError: '',
            reason: '',
            reasonError: '',
        };
    },
    methods: {
        submit () {
            if (validateForm()) {
                return;
            }
            const order = getOrderParam();
            let promise;
            if (thiz.id > 0) {
                order.id = thiz.id;
                promise = thiz.$http.patch('/jiadian/order', order);
            } else {
                promise = thiz.$http.post('/jiadian/order', order);
            }
            thiz.$store.commit('setLoading', true);
            promise.then(function (response) {
                thiz.$store.commit('setLoading', false);
                return response.json();
            }).then(function (result) {
                if (0 === result.code) {
                    if (tempStatus !== thiz.status) {
                        let url = '/jiadian/order/normal';
                        if ('维修中' === thiz.status) {
                            url = '/jiadian/order/mend';
                        } else if ('维修成功' === thiz.status) {
                            url = '/jiadian/order/succeed';
                        } else if ('维修失败' === thiz.status) {
                            url = '/jiadian/order/fail';
                        }
                        thiz.$http.post(url, {
                            id: result.data.id
                        });
                    }
                    thiz.$router.back();
                } else {
                    thiz.reasonError = result.message;
                }
            }).catch(function (response) {});
        },
        cancel () {
            this.$router.back();
        }
    },
    mounted () {
        thiz = this;
        if (!thiz.activityId) {
            if (!thiz.id) {
                thiz.$router.replace('/jiadian/activity');
                return;
            }
        }
        if (thiz.id) {
            getOrder();
        }
    },
    computed: {
        cannotSubmit () {
            if (this.mobile.length !== 11 && this.phone.length < 3) {
                return false;
            }
            return this.name.length <= 0 || this.owner.length <= 0;
        },
    },
    watch: {
        status (val) {
            console.log(val);
            console.log(val === tempStatus);
        },
    },
};
</script>
