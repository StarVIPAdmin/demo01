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
     * 物品类
     */
    var Item = /** @class */ (function (_super) {
        __extends(Item, _super);
        function Item() {
            var _this = _super.call(this) || this;
            _this._icon = null;
            _this._starTexture = null;
            _this._speedTexture = null;
            _this._flyTexture = null;
            _this.type = "";
            return _this;
        }
        Item.prototype.init = function (ItemType) {
            this.type = ItemType;
            if (this._icon == null) {
                this._starTexture = Laya.loader.getRes(Global.Path.PNG_ITEM_1);
                this._speedTexture = Laya.loader.getRes(Global.Path.PNG_ITEM_3);
                this._flyTexture = Laya.loader.getRes(Global.Path.PNG_ITEM_4);
                this._icon = new Sprite();
                this.addChild(this._icon);
            }
            this._icon.graphics.clear();
            switch (ItemType) {
                case Global.Const.ITEM_TYPE_STAR:
                    this._icon.graphics.drawTexture(this._starTexture, 0, 0, 32, 32);
                    break;
                case Global.Const.ITEM_TYPE_SPEED:
                    this._icon.graphics.drawTexture(this._speedTexture, 0, 0, 32, 32);
                    break;
                case Global.Const.ITEM_TYPE_FLY:
                    this._icon.graphics.drawTexture(this._flyTexture, 0, 0, 32, 32);
                    break;
                default:
                    break;
            }
        };
        return Item;
    }(Sprite));
    Game.Item = Item;
})(Game || (Game = {}));
//# sourceMappingURL=Item.js.map