import moment from 'moment';

export let pickerOption = {
    format: 'YYYY-MM-DD',
    placeholder: '',
    sundayFirst: true,
    week: ['一', '二', '三', '四', '五', '六', '日'],
    month: ['一月', '二月', '三月', '四月', '五月', '六月',
            '七月', '八月', '九月', '十月', '十一月', '十二月'],
    buttons: {
        ok: '确定',
        cancel: '取消'
    }
},
pickerLimit = [
    {
        type: 'fromto',
        to: moment().format('YYYY-MM-DD')
    }
];
