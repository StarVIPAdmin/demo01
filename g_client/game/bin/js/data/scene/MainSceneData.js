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
                this._cfgId = cfgId;
            },
            enumerable: true,
            configurable: true
        });
        return MainSceneData;
    }(Core.BaseSceneData));
    Data.MainSceneData = MainSceneData;
})(Data || (Data = {}));
//# sourceMappingURL=MainSceneData.js.map