var BaseCfg = /** @class */ (function () {
    function BaseCfg() {
    }
    Object.defineProperty(BaseCfg, "name", {
        /** 配置表名（必须重写） */
        get: function () {
            return "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCfg, "data", {
        /** 提供外部获取配置数据 */
        get: function () {
            return this.data;
        },
        enumerable: true,
        configurable: true
    });
    /** 初始化 */
    BaseCfg.onInit = function () {
        if (this._data == null && this.name != "") {
            this._data = Laya.loader.getRes(Global.Path.CFG_PATH + this.name + ".json");
        }
    };
    // 配置数据
    BaseCfg._data = null;
    return BaseCfg;
}());
//# sourceMappingURL=BaseCfg.js.map