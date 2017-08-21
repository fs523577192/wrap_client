import $ from 'jquery';
import Es6Promise from 'es6-promise';
import './common/common.js';

var myAjax = function (options) {
    options = options || {};
    return new Es6Promise(function (resolve, reject) {
        $.ajax({
            url: options.url || '',
            method: options.method || 'GET',
            data: options.data || {},
            dataType: 'json',
            cache: options.cache,
            contentType: options.contentType,
            processData: options.processData,
            error: function (jqXHR, status, error) {
                if ('parseerror' === error) {
                    reject({
                        reason: myAjax.ERROR_PARSE,
                        message: options.messageParseError ||
                                'The response is not in JSON format',
                        status: status,
                        error: error
                    });
                } else {
                    reject({
                        reason: myAjax.ERROR_NETWORK,
                        message: options.messageNetworkError ||
                                'There is something wrong with your network',
                        status: status,
                        error: error
                    });
                }
            },
            success: function (data, status, jqXHR) {
                if (0 === data.code) {
                    resolve({
                        data: data.data,
                        message: data.message,
                        timestamp: data.timestamp
                    });
                } else if (10 === data.code) {
                    reject({
                        reason: myAjax.ERROR_LOGIN,
                        message: data.message,
                        timestamp: data.timestamp
                    });
                } else if (String.isString(data.message)) {
                    reject({
                        reason: myAjax.ERROR_SERVER_DEFINED,
                        message: data.message,
                        code: data.code,
                        timestamp: data.timestamp
                    });
                }
            }
        });
    });
};
myAjax.ERROR_NETWORK = 'network';
myAjax.ERROR_PARSE = 'parse';
myAjax.ERROR_LOGIN = 'login';
myAjax.ERROR_SERVER_DEFINED = 'server_defined';
export default myAjax;
