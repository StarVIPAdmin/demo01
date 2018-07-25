var Core;
(function (Core) {
    /**
     * 单例基类
     */
    var BaseSingleton = /** @class */ (function () {
        function BaseSingleton() {
            var cls = this["constructor"];
            if (!cls) {
                return;
            }
            // 防止重复实例化
            if (-1 != BaseSingleton.clsKey.indexOf(cls)) {
                throw new Error(this + " 只能被实例化一次!");
            }
            else {
                BaseSingleton.clsKey.push(cls);
                BaseSingleton.clsVal.push(this);
            }
        }
        BaseSingleton.prototype.create = function () {
            this.onCreate();
        };
        BaseSingleton.prototype.destroy = function (param) {
            this.onDestroy();
            BaseSingleton.removeInstance(this["constructor"]);
        };
        BaseSingleton.prototype.onCreate = function () { };
        BaseSingleton.prototype.onDestroy = function () { };
        /**
         * 根据参数，从初始化过的构造函数数组中移除
         * @param cls
         */
        BaseSingleton.removeInstance = function (cls) {
            var idx = this.clsKey.indexOf(cls);
            if (idx == -1) {
                return;
            }
            this.clsKey.splice(idx, 1);
            this.clsVal.splice(idx, 1);
        };
        /**
         * 根据参数，检测是否已在初始化过的构造函数数组中
         * @param cls
         */
        BaseSingleton.checkFunValue = function (cls) {
            var funs = this.clsKey;
            var length = funs.length;
            for (var i = 0; i < length; i++) {
                if (cls == funs[i]) {
                    return this.clsVal[i];
                }
            }
            return undefined;
        };
        /**
         * 获取单例类，若不存在则创建 (所有的单例创建的时候，都必须使用这个方法来创建，这样可以统一管理)
         * @param cls
         */
        BaseSingleton.getInstanceOrCreate = function (cls) {
            var obj = this.checkFunValue(cls);
            if (obj != undefined) {
                return obj;
            }
            obj = new cls();
            obj.create();
            // 判定如果不是Singleton的子类，则手动添加Singleton构造器会自动添加到classMap
            if (!(obj instanceof BaseSingleton)) {
                this.clsKey.push(cls);
                this.clsVal.push(obj);
            }
            return obj;
        };
        /** 存放初始化过的构造函数 **/
        BaseSingleton.clsKey = [];
        BaseSingleton.clsVal = [];
        return BaseSingleton;
    }());
    Core.BaseSingleton = BaseSingleton;
})(Core || (Core = {}));
//# sourceMappingURL=BaseSingleton.js.map