import './common/common.js';

var myAjax = function (instance, options) {
    if (!instance || !instance.$http ||
           !Function.isFunction(instance.$http.get) ||
           !Function.isFunction(instance.$http.post) ||
           !Function.isFunction(instance.$http.patch) ||
           !Function.isFunction(instance.$http.put) ||
           !Function.isFunction(instance.$http.delete)) {
        throw new TypeError('"instance" is not a Vue instance');
    }

    options = options || {};
    if (typeof(options.method) !== 'undefined' &&
            options.method !== null &&
            !String.isString(options.method)) {
        throw new TypeError('Invalid method');
    }
    options.method = options.method && options.method.toUpperCase() || 'GET';
    if (typeof(options.url) !== 'undefined' &&
            options.url !== null &&
            !String.isString(options.url)) {
        throw new TypeError('Invalid url');
    }
    options.url = options.url || '';

    const resolve = function (response) {
        return response.json().then(function (json) {
            if (0 !== json.code) {
                throw response;
            }
            return json;
        });
    };
    if ('GET' === options.method) {
        return instance.$http.get(options.url, options).then(resolve);
    }
    if ('DELETE' === options.method) {
        return instance.$http.delete(options.url, options).then(resolve);
    }
    if ('POST' === options.method) {
        return instance.$http.post(
                options.url, options.body, options).then(resolve);
    }
    if ('PATCH' === options.method) {
        return instance.$http.patch(
                options.url, options.body, options).then(resolve);
    }
    if ('PUT' === options.method) {
        return instance.$http.put(
                options.url, options.body, options).then(resolve);
    }
    throw new Error('Unsupported method');
};
export default myAjax;
