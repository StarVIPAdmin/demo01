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
     * 回收点数据
     */
    var RecycleData = /** @class */ (function (_super) {
        __extends(RecycleData, _super);
        function RecycleData() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // 位置索引
            _this.posIdx = 0;
            return _this;
        }
        RecycleData.prototype.init = function (cfgId) {
            this.cfgId = cfgId;
            this.collisionRadius = 250;
            this.width = 512;
            this.height = 512;
        };
        Object.defineProperty(RecycleData.prototype, "cfgId", {
            get: function () {
                return this._cfgId;
            },
            set: function (cfgId) {
                this._cfgId = cfgId;
                var cfg = ElementCfg.getRecycleCfg(cfgId);
                this.nick = cfg.Name;
                this.bodyPath = Global.Path.RECYCLE_PATH + cfg.ResName + ".png";
            },
            enumerable: true,
            configurable: true
        });
        return RecycleData;
    }(Data.BaseData));
    Data.RecycleData = RecycleData;
})(Data || (Data = {}));
//# sourceMappingURL=RecycleData.js.map