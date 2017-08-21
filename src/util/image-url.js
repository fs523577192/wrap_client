import './common/common.js';
export default function (imageObject) {
    if (
        imageObject &&
        Number.isInteger(imageObject.id) &&
        imageObject.id > 0 &&
        String.isString(imageObject.format) &&
        ('JPG' == imageObject.format ||
        'PNG' == imageObject.format)
    ) {
        var temp = imageObject.id % 100;
        return '/upload/img/' + temp + '/' + imageObject.id +
                '.' + imageObject.format.toLowerCase();
    }
    return null;
};
