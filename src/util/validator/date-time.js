import '../common/common.js';
import DateTimeHelper from '../helper/date-time.js';

const DateTimeValidator = {
    REGEX_DATE: new RegExp("^(\\d{4})-(0[1-9]|1[012])-" +
                "(0[1-9]|[12]\\d|3[01])?$"),
    REGEX_TIME: new RegExp("^([01]\\d|2[0-3])(:([0-5]\\d)){2}$"),
    isDate (str) {
        if (!String.isString(str)) return false;
        var matches = DateTimeValidator.REGEX_DATE.exec(str);
        if (!Array.isArray(matches) || matches.length != 4) return false;

        var maxDays = [31, 28, 31,
                    30, 31, 30,
                    31, 31, 30,
                    31, 30, 31];
        var year = parseInt(matches[1]);
        var month = parseInt(matches[2]);
        var date = parseInt(matches[3]);
        if (2 == month && date > 28 + DateTimeHelper.isLeap(year)) {
            return false;
        }
        return date <= maxDays[month - 1];
    },
    isTime (str) {
        return String.isString(str) && DateTimeValidator.REGEX_TIME.test(str);
    },
    isDateTime (str) {
        if (!String.isString(str)) return false;
        var datetime = str.split(' ');
        return datetime.length == 2 &&
                DateTimeValidator.isDate(datetime[0]) &&
                DateTimeValidator.isTime(datetime[1]);
    }
};
export default DateTimeValidator;
