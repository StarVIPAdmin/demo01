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
     * 药剂buff数据
     */
    var BuffData = /** @class */ (function (_super) {
        __extends(BuffData, _super);
        function BuffData() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // 位置索引
            _this.posIdx = 0;
            return _this;
        }
        BuffData.prototype.init = function (cfgId) {
            this.cfgId = cfgId;
            this.width = 512;
            this.height = 512;
            this.collisionRadius = 250;
        };
        Object.defineProperty(BuffData.prototype, "cfgId", {
            get: function () {
                return this._cfgId;
            },
            set: function (cfgId) {
                if (this._cfgId == cfgId) {
                    return;
                }
                this._cfgId = cfgId;
                var cfg = ElementCfg.getBuffCfg(cfgId);
                this.nick = cfg.Name;
                this.bodyPath = Global.Path.BUFF_PATH + cfg.ResName + ".png";
            },
            enumerable: true,
            configurable: true
        });
        return BuffData;
    }(Data.BaseData));
    Data.BuffData = BuffData;
})(Data || (Data = {}));
//# sourceMappingURL=BuffData.js.map