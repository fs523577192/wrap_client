import '../common/common.js';

const DateTimeHelper = {
    isLeap (year) {
        if (String.isString(year)) {
            if (/^\d{1,4}$/.test(year)) year = parseInt(year);
        }
        if (!Integer.isInteger(year)) {
            var temp = new Date();
            year = temp.getFullYear();
        }
        return year % (year % 100 ? 4 : 400) == 0;
    },
    dayBegin (date) {
        if (Number.isInteger(date)) {
            date = new Date(date);
        } else if (String.isString(date)) {
            date = new Date(date);
        } else if (!(date instanceof Date)) {
            date = new Date();
        }
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    },
    dayEnd (date) {
        if (Number.isInteger(date)) {
            date = new Date(date);
        } else if (String.isString(date)) {
            date = new Date(date);
        } else if (!(date instanceof Date)) {
            date = new Date();
        }
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);
        date.setMilliseconds(999);
        return date;
    }
};
export default DateTimeHelper;
