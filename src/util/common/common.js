Function.isFunction = function (obj) {
    return typeof(obj) === 'function';
};

Number.isNumber = function (obj) {
    return typeof(obj) === 'number';
};
if (!Function.isFunction(Number.isNaN)) {
    Number.isNaN = function (obj) {
        return obj !== obj;
        // return Number.isNumber(obj) && isNaN(obj);
    };
}
if (!Function.isFunction(Number.isFinite)) {
    Number.isFinite = function (obj) {
        return Number.isNumber(obj) && isFinite(obj);
    };
}
if (!Function.isFunction(Number.isInteger)) {
    Number.isInteger = function (obj) {
        return Number.isFinite(obj) && Math.floor(obj) === obj;
    };
}

String.isString = function (obj) {
    return typeof(obj) === 'string' || obj instanceof String;
};
if (!Function.isFunction(String.fromCodePoint)) {
    String.fromCodePoint = function () {
        'use strict';

        const MAX_SIZE = 0x4000;
        let codeUnits = [];
        let index = -1;
        let result = '';
        while (++index < arguments.length) {
            var codePoint = Number(arguments[index]);
            if (!Number.isInteger(codePoint) ||
                    codePoint < 0 || codePoint > 0x10FFFF) {
                throw RangeError('Invalid code point: ' + codePoint);
            }
            if (codePoint <= 0xFFFF) {
                codeUnits.push(codePoint);
            } else {
                codePoint -= 0x10000;
                let highSurrogate = (codePoint >> 10) | 0xD800;
                let lowSurrogate = (codePoint & 0x3FF) | 0xDC00;
                codeUnits.push(highSurrogate, lowSurrogate);
            }
            if (index + 1 === arguments.length || codeUnits.length > MAX_SIZE) {
                result = result + String.fromCharCode.apply(null, codeUnits);
                codeUnits = [];
            }
        }
        return result;
    };
}
String.prototype.isEmpty = function () {
    return this.length <= 0;
};
String.prototype.forEachCode = function (callback, thisArg) {
    'use strict';
    thisArg = thisArg || this;
    for (let i = 0; i < this.length; ++i) {
        let first = this.charCodeAt(i);
        if ((0xFC00 & first) === 0xD800) {
            // 0xD800 <= first || first <= 0xDBFF
            const second = this.charCodeAt(i + 1);
            if ((0xFC00 & second) === 0xDC00) {
                // 0xDC00 <= second && second <= 0xDFFF
                const c = ((first & 0x3FF) << 10) + (second & 0x3FF) | 0x10000;
                // (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
                if (false === callback(c, i++, thisArg)) {
                    return;
                }
                continue;
            }
        }
        if (false === callback(first, i, thisArg)) {
            return;
        }
    }
};

Array.prototype.isEmpty = function () {
    return this.length <= 0;
};
if (!Function.isFunction(Array.prototype.every)) {
    Array.prototype.every = function(fun) {
        'use strict';

        if (this === void 0 || this === null) {
            throw new TypeError();
        }

        const t = Object(this);
        const len = t.length >>> 0;
        if (typeof fun !== 'function') {
            throw new TypeError();
        }

        const thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (let i = 0; i < len; i++) {
            if (i in t && !fun.call(thisArg, t[i], i, t)) {
                return false;
            }
        }

        return true;
    };
}
if (!Function.isFunction(Array.prototype.some)) {
    Array.prototype.some = function(fun) {
        'use strict';

        if (this === void 0 || this === null) {
            throw new TypeError();
        }

        const t = Object(this);
        const len = t.length >>> 0;
        if (typeof fun !== 'function') {
            throw new TypeError();
        }

        const thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (let i = 0; i < len; i++) {
            if (i in t && fun.call(thisArg, t[i], i, t)) {
                return true;
            }
        }

        return false;
    };
}

if (!Function.isFunction(Object.assign)) {
    Object.assign = function () {
        'use strict';

        if (arguments.length <= 0 || typeof(arguments[0]) === 'undefined' ||
                arguments[0] === null) {
            throw new TypeError("Cannot convert undefined or null to object");
        }
        const to = Object(arguments[0]);

        for (let i = 1; i < arguments.length; ++i) {
            const nextSource = arguments[i];
            if (typeof(nextSource) !== 'undefined' && nextSource !== null) {
                for (var nextKey in nextSource) {
                    if (Object.prototype.hasOwnProperty.call(
                            nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    } // inner if
                } // inner for
            } // outer if
        } // outer for

        return to;
    };
}

if (!Function.isFunction(Date.now)) {
    Date.now = function () {
        return (new Date()).getTime();
    };
}

export default {};
