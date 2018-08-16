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
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BuffData.prototype.init = function () {
            this.cfgId = 1;
            this.nick = "药剂" + this.id;
            this.bodyPath = Global.Path.PNG_BUFF_1;
            this.width = 512;
            this.height = 512;
            this.collisionRadius = 500;
            this.x = Math.random() * Global.Const.MAP_WIDTH;
            this.y = Math.random() * Global.Const.MAP_HEIGHT;
        };
        return BuffData;
    }(Data.BaseData));
    Data.BuffData = BuffData;
})(Data || (Data = {}));
//# sourceMappingURL=BuffData.js.map