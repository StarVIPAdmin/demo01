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
    // 最小/最大值
    var MIN_VALUE = 0;
    var MAX_VALUE = 100;
    /**
     * 进度条
     */
    var Bar = /** @class */ (function (_super) {
        __extends(Bar, _super);
        function Bar(BarType) {
            var _this = _super.call(this) || this;
            _this._bg = null;
            _this._bar = null;
            _this.value = 100;
            _this.init(BarType);
            return _this;
        }
        Bar.prototype.init = function (BarType) {
            this.width = 180;
            this.height = 21;
            var texture1 = Laya.loader.getRes(Global.Path.PNG_HP_BG);
            var texture2;
            switch (BarType) {
                case Global.Const.BAR_TYPE_ENERGY:
                    texture2 = Laya.loader.getRes(Global.Path.PNG_EN_BAR);
                    break;
                case Global.Const.BAR_TYPE_SPEED:
                    texture2 = Laya.loader.getRes(Global.Path.PNG_HP_BAR);
                    break;
            }
            this._bg = new Sprite();
            this._bar = new Sprite();
            this._bar.x = 15;
            this._bar.y = 2;
            this._bg.graphics.drawTexture(texture1, 0, 0, 180, 21);
            this._bar.graphics.drawTexture(texture2, 0, 0, 155, 12);
            this.addChild(this._bg);
            this.addChild(this._bar);
        };
        Bar.prototype.changeValue = function (Val) {
            this.value += Val;
            if (this.value < MIN_VALUE) {
                this.value = MIN_VALUE;
            }
            else if (this.value > MAX_VALUE) {
                this.value = MAX_VALUE;
            }
            this._bar.scale(this.value / MAX_VALUE, 1);
        };
        return Bar;
    }(Sprite));
    Game.Bar = Bar;
})(Game || (Game = {}));
//# sourceMappingURL=Bar.js.map