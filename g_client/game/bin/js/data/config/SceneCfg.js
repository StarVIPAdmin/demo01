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
 * 场景配置表
 */
var SceneCfg = /** @class */ (function (_super) {
    __extends(SceneCfg, _super);
    function SceneCfg() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SceneCfg, "path", {
        /** 配置表路径 */
        get: function () {
            return Global.Path.CFG_PATH + "scene_cfg.json";
        },
        enumerable: true,
        configurable: true
    });
    SceneCfg.getSceneCfg = function (cfgId) {
        return this._data.SceneCfg[cfgId];
    };
    return SceneCfg;
}(BaseCfg));
//# sourceMappingURL=SceneCfg.js.map