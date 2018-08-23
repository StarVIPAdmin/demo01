var BaseCfg = /** @class */ (function () {
    function BaseCfg() {
    }
    Object.defineProperty(BaseCfg, "data", {
        /** 提供外部获取配置数据 */
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    /** 初始化 */
    BaseCfg.onInit = function (cfgPath) {
        if (this._data == null) {
            this._data = Laya.loader.getRes(cfgPath);
        }
    };
    // 配置数据
    BaseCfg._data = null;
    return BaseCfg;
}());
//# sourceMappingURL=BaseCfg.js.map