(function () {
    Storage.prototype.getObject = function (name) {
        var temp = this.getItem(name);
        if (!String.isString(temp)) return temp;
        return JSON.parse(temp);
    }
    Storage.prototype.setObject = function (name, obj) {
        if (undefined === obj) {
            this.removeItem(name);
        } else {
            this.setItem(name, JSON.stringify(obj));
        }
    }
})();
