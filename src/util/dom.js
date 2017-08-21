import './common/common.js';

export function getHeight(el) {
    if (Number.isNumber(el.offsetHeight)) return el.offsetHeight;
    if (Function.isFunction(el.getBoundingClientRect)) {
        let rect = el.getBoundingClientRect();
        if (Number.isNumber(rect.height)) return rect.height;
        return rect.bottom - rect.top;
    }
    return null;
};

export function getWidth(el) {
    if (Number.isNumber(el.offsetWidth)) return el.offsetWidth;
    if (Function.isFunction(el.getBoundingClientRect)) {
        let rect = el.getBoundingClientRect();
        if (Number.isNumber(rect.width)) return rect.width;
        return rect.right - rect.left;
    }
    return null;
};
