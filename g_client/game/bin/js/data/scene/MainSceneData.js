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
var Data;
(function (Data) {
    /**
     * 主场景数据
     */
    var MainSceneData = /** @class */ (function (_super) {
        __extends(MainSceneData, _super);
        function MainSceneData() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** 重写父类函数 */
        MainSceneData.prototype.onInit = function (Params) {
            _super.prototype.onInit.call(this);
            this._buffPos = [];
            this._foodPos = [];
            this._recyclePos = [];
            this.cfgId = Params;
        };
        /** 重写父类函数 */
        MainSceneData.prototype.onClear = function () {
            _super.prototype.onClear.call(this);
        };
        Object.defineProperty(MainSceneData.prototype, "cfgId", {
            set: function (cfgId) {
                if (this._cfgId == cfgId) {
                    return;
                }
                var sceneCfg = SceneCfg.getSceneCfg(cfgId);
                this._cfgId = cfgId;
                this._mapPath = Global.Path.MAP_PATH + sceneCfg.MapName + ".jpg";
                this._buffPos = sceneCfg.BuffPos;
                this._foodPos = sceneCfg.FoodPos;
                this._recyclePos = sceneCfg.RecyclePos;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MainSceneData.prototype, "mapPath", {
            get: function () {
                return this._mapPath;
            },
            enumerable: true,
            configurable: true
        });
        /** 根据索引获取buff药剂坐标 */
        MainSceneData.prototype.getBuffPosByIdx = function (idx) {
            return this._buffPos[idx] || { "x": 0, "y": 0 };
        };
        /** 根据索引获取食物坐标 */
        MainSceneData.prototype.getFoodPosByIdx = function (idx) {
            return this._foodPos[idx] || { "x": 0, "y": 0 };
        };
        /** 根据索引获取洞穴坐标 */
        MainSceneData.prototype.getRecyclePosByIdx = function (idx) {
            return this._recyclePos[idx] || { "x": 0, "y": 0 };
        };
        return MainSceneData;
    }(Core.BaseSceneData));
    Data.MainSceneData = MainSceneData;
})(Data || (Data = {}));
//# sourceMappingURL=MainSceneData.js.map