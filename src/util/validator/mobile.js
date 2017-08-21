export function isMobile(str) {
    return /^1\d{10}$/.test(str);
};

export function isMobilePartial(str) {
    return /^(1\d{0,10})?$/.test(str);
};

export function filterMobile(str) {
    return str.replace(/\D/g, '').substring(0, 11);
};
