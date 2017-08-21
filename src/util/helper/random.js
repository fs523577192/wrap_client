// '0' = 0x30, 'A' = 0x41, 'a' = 0x61
export default {
    randomNumericString: function (length) {
        var result = '';
        while (length-- > 0) {
            var temp = Math.floor(Math.random() * 10);
            result = result + String.fromCharCode(0x30 + temp);
        }
        return result;
    },
    randomUpperCaseString: function (length) {
        var result = '';
        while (length-- > 0) {
            var temp = Math.floor(Math.random() * 26);
            result = result + String.fromCharCode(0x41 + temp);
        }
        return result;
    },
    randomLowerCaseString: function (length) {
        var result = '';
        while (length-- > 0) {
            var temp = Math.floor(Math.random() * 26);
            result = result + String.fromCharCode(0x61 + temp);
        }
        return result;
    },
    randomAlphabetString: function (length) {
        var result = '';
        while (length-- > 0) {
            var temp = Math.random() * 52; // 52 = 26 * 2
            if (temp < 26) {
                result = result + String.fromCharCode(0x41 + temp);
            } else {
                result = result + String.fromCharCode(0x61 + temp - 26);
            }
        }
        return result;
    },
    randomAlphaNumericString: function (length) {
        var result = '';
        while (length-- > 0) {
            var temp = Math.random() * 62;
            if (temp < 26) {
                result = result + String.fromCharCode(0x41 + temp);
            } else if ((temp -= 26) < 26) {
                result = result + String.fromCharCode(0x61 + temp);
            } else {
                result = result + String.fromCharCode(0x30 + temp - 26);
            }
        }
        return result;
    }
};
