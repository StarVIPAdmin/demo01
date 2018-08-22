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
var Game;
(function (Game) {
    /**
     * 配置管理
     */
    var ConfigMgr = /** @class */ (function (_super) {
        __extends(ConfigMgr, _super);
        function ConfigMgr() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ConfigMgr, "instance", {
            /** 获取单例实例 */
            get: function () {
                return _super.getInstanceOrCreate.call(this, ConfigMgr);
            },
            enumerable: true,
            configurable: true
        });
        /** 重写父类函数 */
        ConfigMgr.prototype.onCreate = function () {
        };
        /** 重写父类函数 */
        ConfigMgr.prototype.onDestroy = function () {
        };
        /** 初始化配置 */
        ConfigMgr.prototype.initConfig = function () {
            ElementCfg.onInit(ElementCfg.path);
            SceneCfg.onInit(SceneCfg.path);
            ScoreCfg.onInit(ScoreCfg.path);
        };
        return ConfigMgr;
    }(Core.BaseSingleton));
    Game.ConfigMgr = ConfigMgr;
})(Game || (Game = {}));
//# sourceMappingURL=ConfigMgr.js.map