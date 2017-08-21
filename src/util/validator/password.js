import '../common/common.js';
export default {
    MIN_LENGTH: 6,
    MAX_LENGTH: 20,
    filter (str) {
        let result = '';
        str.forEachCode(function (c) {
            if (0x20 <= c && c <= 0x7E) {
                result = result + String.fromCodePoint(c);
            }
        });
        return result;
    },
    validate (str) {
        if (str < MIN_LENGTH) return "min";
        if (str > MAX_LENGTH) return "max";
        let result = true;
        str.forEachCode(function (c) {
            if (0x20 > c || 0x7E < c) {
                result = 'invalid';
            }
        });
        return result;
    }
};
