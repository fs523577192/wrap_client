Function.isFunction = function (obj) {
    return typeof(obj) == 'function';
};

Number.isNumber = function (obj) {
    return typeof(obj) == 'number';
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
        return Number.isFinite(obj) && Math.floor(obj) == obj;
    };
}

String.isString = function (obj) {
    return typeof(obj) == 'string' || obj instanceof String;
};
if (!Function.isFunction(String.fromCodePoint)) {
    String.fromCodePoint = function () {
        'use strict';

        var MAX_SIZE = 0x4000;
        var codeUnits = [];
        var index = -1;
        var result = '';
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
                var highSurrogate = (codePoint >> 10) | 0xD800;
                var lowSurrogate = (codePoint & 0x3FF) | 0xDC00;
                codeUnits.push(highSurrogate, lowSurrogate);
            }
            if (index + 1 == arguments.length || codeUnits.length > MAX_SIZE) {
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
    for (var i = 0; i < this.length; ++i) {
        var first = this.charCodeAt(i);
        if ((0xFC00 & first) == 0xD800) {
            // 0xD800 <= first || first <= 0xDBFF
            var second = this.charCodeAt(i + 1);
            if ((0xFC00 & second) == 0xDC00) {
                // 0xDC00 <= second && second <= 0xDFFF
                var c = ((first & 0x3FF) << 10) + (second & 0x3FF) | 0x10000;
                // (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
                if (false === callback(c, i++, thisArg)) return;
                continue;
            }
        }
        if (false === callback(first, i, thisArg)) return;
    }
};

Array.prototype.isEmpty = function () {
    return this.length <= 0;
};
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement, fromIndex) {

        var k;

        // 1. Let O be the result of calling ToObject passing
        //    the this value as the argument.
        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }

        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get
        //    internal method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If len is 0, return -1.
        if (len === 0) {
            return -1;
        }

        // 5. If argument fromIndex was passed let n be
        //    ToInteger(fromIndex); else let n be 0.
        var n = +fromIndex || 0;

        if (Math.abs(n) === Infinity) {
            n = 0;
        }

        // 6. If n >= len, return -1.
        if (n >= len) {
            return -1;
        }

        // 7. If n >= 0, then Let k be n.
        // 8. Else, n<0, Let k be len - abs(n).
        //    If k is less than 0, then let k be 0.
        k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        // 9. Repeat, while k < len
        while (k < len) {
            // a. Let Pk be ToString(k).
            //   This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the
            //    HasProperty internal method of O with argument Pk.
            //   This step can be combined with c
            // c. If kPresent is true, then
            //    i.  Let elementK be the result of calling the Get
            //        internal method of O with the argument ToString(k).
            //   ii.  Let same be the result of applying the
            //        Strict Equality Comparison Algorithm to
            //        searchElement and elementK.
            //  iii.  If same is true, return k.
            if (k in O && O[k] === searchElement) {
                return k;
            }
            k++;
        }
        return -1;
    };
}
if (!Function.isFunction(Array.prototype.every)) {
    Array.prototype.every = function(fun) {
        'use strict';

        if (this === void 0 || this === null)
            throw new TypeError();

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== 'function') throw new TypeError();

        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
            if (i in t && !fun.call(thisArg, t[i], i, t))
                return false;
        }

        return true;
    };
}
if (!Function.isFunction(Array.prototype.some)) {
    Array.prototype.some = function(fun) {
        'use strict';

        if (this === void 0 || this === null)
            throw new TypeError();

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== 'function') throw new TypeError();

        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
            if (i in t && fun.call(thisArg, t[i], i, t))
                return true;
        }

        return false;
    };
}

if (!Function.isFunction(Object.assign)) {
    Object.assign = function () {
        'use strict';

        if (arguments.length <= 0 || arguments[0] === undefined ||
                arguments[0] === null) {
            throw new TypeError("Cannot convert undefined or null to object");
        }
        var to = Object(arguments[0]);

        for (var i = 1; i < arguments.length; ++i) {
            var nextSource = arguments[i];
            if (nextSource !== undefined && nextSource !== null) {
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
