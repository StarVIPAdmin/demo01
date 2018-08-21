var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 元素配置表
 */
var ElementCfg = /** @class */ (function (_super) {
    __extends(ElementCfg, _super);
    function ElementCfg() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ElementCfg, "name", {
        /** 重写父类函数 */
        get: function () {
            return "element_cfg";
        },
        enumerable: true,
        configurable: true
    });
    ElementCfg.getBuffCfg = function (cfgId) {
        return this._data.BuffCfg[cfgId];
    };
    ElementCfg.getFoodCfg = function (cfgId) {
        return this._data.FoodCfg[cfgId];
    };
    ElementCfg.getRecycleCfg = function (cfgId) {
        return this._data.RecycleCfg[cfgId];
    };
    return ElementCfg;
}(BaseCfg));
//# sourceMappingURL=ElementCfg.js.map