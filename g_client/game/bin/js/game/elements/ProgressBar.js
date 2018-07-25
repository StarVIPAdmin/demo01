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
    var VALUE_MIN = 0;
    var VALUE_MAX = 100;
    ;
    ;
    /**
     * 进度条
     */
    var ProgressBar = /** @class */ (function (_super) {
        __extends(ProgressBar, _super);
        function ProgressBar(BarType) {
            var _this = _super.call(this) || this;
            _this.initData();
            _this.initUI(BarType);
            return _this;
        }
        ProgressBar.prototype.initData = function () {
            this._bg = null;
            this._bar = null;
            this.value = VALUE_MIN;
        };
        ProgressBar.prototype.initUI = function (BarType) {
            this.width = 180 /* x */;
            this.height = 21 /* y */;
            var texture1 = Laya.loader.getRes(Global.Path.PNG_BAR_BG);
            var texture2;
            switch (BarType) {
                case Global.Const.BAR_TYPE_MP:
                    texture2 = Laya.loader.getRes(Global.Path.PNG_BAR_MP);
                    break;
                case Global.Const.BAR_TYPE_HP:
                    texture2 = Laya.loader.getRes(Global.Path.PNG_BAR_HP);
                    break;
            }
            this._bg = new Sprite();
            this._bar = new Sprite();
            this._bar.x = 15;
            this._bar.y = 2;
            this._bg.graphics.drawTexture(texture1, 0, 0, 180 /* x */, 21 /* y */);
            this._bar.graphics.drawTexture(texture2, 0, 0, 155 /* x */, 12 /* y */);
            this.addChild(this._bg);
            this.addChild(this._bar);
        };
        ProgressBar.prototype.changeValue = function (Val) {
            this.value += Val;
            if (this.value < VALUE_MIN) {
                this.value = VALUE_MIN;
            }
            else if (this.value > VALUE_MAX) {
                this.value = VALUE_MAX;
            }
            this._bar.scale(this.value / VALUE_MAX, 1);
        };
        return ProgressBar;
    }(Sprite));
    Game.ProgressBar = ProgressBar;
})(Game || (Game = {}));
//# sourceMappingURL=ProgressBar.js.map