import myAjax from './ajax.js';
export default function (exception) {
    if (exception.reason === myAjax.ERROR_NETWORK &&
            exception.error === 'Forbidden') {
        location.href = '/cns/admin/login.html';
        return false;
    }
    if (exception.reason === myAjax.ERROR_LOGIN) {
        location.href = '/cns/admin/login.html?after_expire=1';
        return false;
    }
    return true;
};
