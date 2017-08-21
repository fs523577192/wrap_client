import '../common/common.js';

export function isChineseUnicode(c) {
    return 0x3400 <= c && c <= 0x4DBF || 0x4E00 <= c && c <= 0x9FFF ||
            0xF900 <= c && c <= 0xFAFF || 0x20000 <= c && c <= 0x2A6D6 ||
            0x2A700 <= c && c <= 0x2B734 || 0x2B820 <= c && c <= 0x2CEA1 ||
            0x2F800 <= c && c <= 0x2FA1F;
};
export function isMiddlePoint(c) {
    return 0xb7 == c;
};
export function isChinese(str) {
    var result = true;
    str.forEachCode(function (c) {
        if (!isChineseUnicode(c)) return result = false;
        return true;
    });
    return result;
};
export function filterChinese(str) {
    var result = '';
    str.forEachCode(function (c) {
        if (isChineseUnicode(c)) {
            result = result + String.fromCodePoint(c);
        }
    });
    return result;
};
