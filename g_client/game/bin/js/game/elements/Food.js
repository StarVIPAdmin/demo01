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
    var Sprite = Laya.Sprite;
    /**
     * 食物类
     */
    var Food = /** @class */ (function (_super) {
        __extends(Food, _super);
        function Food() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Food.prototype.init = function (foodId) {
            this.data.Id = foodId;
            this.data.cfgId = 1;
            this.data.type = Data.FoodType.BOTANY;
            var cfg = {};
            var iconTexture = Laya.loader.getRes(Global.Path.PNG_ITEM_1);
            if (this._icon == null) {
                this._icon = new Sprite();
                this.addChild(this._icon);
            }
            this._icon.graphics.clear();
            this._icon.graphics.drawTexture(iconTexture, 0, 0, 32, 32);
        };
        return Food;
    }(Sprite));
    Game.Food = Food;
})(Game || (Game = {}));
//# sourceMappingURL=Food.js.map