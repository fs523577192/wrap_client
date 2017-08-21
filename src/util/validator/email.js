import '../common/common.js';
var REGEX_EMAIL = new RegExp("^[\\w!#$%&'*+/=?^_`{|}~-]+" +
                "(?:\\.[\\w!#$%&'*+/=?^_`{|}~-]+)*@" +
				"(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?$");
export function isEmail(str) {
    return String.isString(str) && REGEX_EMAIL.test(str);
};
