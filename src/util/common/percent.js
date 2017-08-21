export default function getPercent(some, total) {
    if (total <= 0 || some <= 0) return '0%';

    let p = Math.round(some * 10000 / total).toString();
    if (p.length == 1) return '0.0' + p + '%';
    if (p.length == 2) return '0.' + p.replace(/0$/, '') + '%';

    let temp = p.substring(p.length - 2).replace(/00?$/, '');
    if (temp.length > 0) return p.substring(0, p.length - 2) +
            '.' + temp + '%';
    return p.substring(0, p.length - 2) + '%';
};
