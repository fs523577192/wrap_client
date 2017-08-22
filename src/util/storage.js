(function () {
    Storage.prototype.getObject = function (name) {
        const temp = this.getItem(name);
        return !String.isString(temp) ? temp : JSON.parse(temp);
    };
    Storage.prototype.setObject = function (name, obj) {
        if (typeof(obj) === 'undefined') {
            this.removeItem(name);
        } else {
            this.setItem(name, JSON.stringify(obj));
        }
    };
})();