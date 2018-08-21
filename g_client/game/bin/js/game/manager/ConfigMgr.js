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
            var cfgPath = Global.Path.CFG_PATH;
            this._cfgPathList = [
                { "url": cfgPath + ElementCfg.name + ".json", "type": Laya.Loader.JSON },
                { "url": cfgPath + SceneCfg.name + ".json", "type": Laya.Loader.JSON },
                { "url": cfgPath + ScoreCfg.name + ".json", "type": Laya.Loader.JSON }
            ];
        };
        /** 重写父类函数 */
        ConfigMgr.prototype.onDestroy = function () {
            this._cfgPathList = null;
        };
        Object.defineProperty(ConfigMgr.prototype, "cfgPathList", {
            get: function () {
                return this._cfgPathList;
            },
            enumerable: true,
            configurable: true
        });
        return ConfigMgr;
    }(Core.BaseSingleton));
    Game.ConfigMgr = ConfigMgr;
})(Game || (Game = {}));
//# sourceMappingURL=ConfigMgr.js.map