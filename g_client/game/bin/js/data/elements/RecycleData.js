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
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RecycleData.prototype.init = function () {
            this.nick = "食物回收" + this.id;
            this.bodyPath = Global.Path.PNG_FOOD_RECYCLE_1;
            this.collisionRadius = 250;
            this.width = 512;
            this.height = 512;
            this.x = Math.random() * Global.Const.MAP_WIDTH;
            this.y = Math.random() * Global.Const.MAP_HEIGHT;
        };
        return RecycleData;
    }(Data.BaseData));
    Data.RecycleData = RecycleData;
})(Data || (Data = {}));
//# sourceMappingURL=RecycleData.js.map