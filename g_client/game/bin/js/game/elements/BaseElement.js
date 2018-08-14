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
     * 元素基础类
     */
    var BaseElement = /** @class */ (function (_super) {
        __extends(BaseElement, _super);
        function BaseElement(id) {
            var _this = _super.call(this) || this;
            _this.id = id;
            _this.nickTxt = null;
            _this.bodySpr = null;
            return _this;
        }
        Object.defineProperty(BaseElement.prototype, "data", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        /** 初始化 */
        BaseElement.prototype.init = function () {
            if (this.data == null) {
                return;
            }
            if (this.bodySpr == null) {
                this.bodySpr = Game.ResMgr.instance.createSprite(this.data.bodyPath, this.width, this.height);
                this.addChild(this.bodySpr);
            }
            if (this.nickTxt == null) {
                this.nickTxt = Game.ResMgr.instance.createText();
                this.nickTxt.align = "center";
                this.nickTxt.text = this.data.nick;
                this.nickTxt.pos(this.bodySpr.width * 0.5 - this.nickTxt.width * 0.5, 0);
                this.addChild(this.nickTxt);
            }
        };
        /** 消毁 */
        BaseElement.prototype.destroy = function () {
            if (this.nickTxt != null) {
                this.nickTxt.removeSelf();
                this.nickTxt = null;
            }
            if (this.bodySpr != null) {
                this.bodySpr.removeSelf();
                this.bodySpr = null;
            }
        };
        return BaseElement;
    }(Sprite));
    Game.BaseElement = BaseElement;
})(Game || (Game = {}));
//# sourceMappingURL=BaseElement.js.map