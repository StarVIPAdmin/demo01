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
        function ProgressBar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ProgressBar.prototype, "value", {
            get: function () {
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        ProgressBar.prototype.init = function () {
            this.size(180 /* x */, 21 /* y */);
            this.initData();
            this.initUI();
        };
        ProgressBar.prototype.initData = function () {
            this._bg = null;
            this._bar = null;
            this._value = VALUE_MIN;
        };
        ProgressBar.prototype.initUI = function () {
            this._bg = Game.ResMgr.instance.createSprite(Global.Path.PNG_BAR_BG, 180 /* x */, 21 /* y */);
            this.addChild(this._bg);
            this._bar = Game.ResMgr.instance.createSprite(Global.Path.PNG_BAR_HP, 155 /* x */, 12 /* y */, 15, 2);
            this.addChild(this._bar);
        };
        ProgressBar.prototype.changeValue = function (Val) {
            this._value += Val;
            if (this._value < VALUE_MIN) {
                this._value = VALUE_MIN;
            }
            else if (this._value > VALUE_MAX) {
                this._value = VALUE_MAX;
            }
            this._bar.scale(this._value / VALUE_MAX, 1);
        };
        return ProgressBar;
    }(Sprite));
    Game.ProgressBar = ProgressBar;
})(Game || (Game = {}));
//# sourceMappingURL=ProgressBar.js.map