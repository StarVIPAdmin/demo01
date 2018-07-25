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
    var BG_WIDTH = 1600;
    /**
     * 背景类
     */
    var BackgroundUI = /** @class */ (function (_super) {
        __extends(BackgroundUI, _super);
        function BackgroundUI() {
            var _this = _super.call(this) || this;
            _this._moveX = 0;
            _this._bg1 = null;
            _this._bg2 = null;
            _this._grass = null;
            _this.init();
            return _this;
        }
        BackgroundUI.prototype.init = function () {
            var texture1 = Laya.loader.getRes(Global.Path.PNG_BACKGROUND);
            var texture2 = Laya.loader.getRes(Global.Path.PNG_M_BACKGROUND);
            this._bg1 = new Sprite();
            this._bg1.graphics.drawTexture(texture1, 0, 0);
            this.addChild(this._bg1);
            this._bg2 = new Sprite();
            this._bg2.graphics.drawTexture(texture1, 0, 0);
            this.addChild(this._bg2);
            this._bg2.pos(BG_WIDTH, 0);
            this._grass = new Sprite();
            this._grass.graphics.drawTexture(texture2, 0, 0);
            this.addChild(this._grass);
        };
        BackgroundUI.prototype.move = function (ToRight) {
            if (ToRight === void 0) { ToRight = true; }
            if (Data.isPause || Data.isOver)
                return;
            if (ToRight) {
                this.x -= Data.speed * 0.5;
            }
            else {
                this.x += Data.speed * 0.5;
            }
            this._moveX = Math.abs(this.x);
            if (this._moveX - this._bg1.x >= BG_WIDTH) {
                this._bg1.x += BG_WIDTH * 2;
            }
            if (this._moveX - this._bg2.x >= BG_WIDTH) {
                this._bg2.x += BG_WIDTH * 2;
            }
            this._grass.x -= 5 * 0.5;
            if (this._grass.x + 960 < 0) {
                this._grass.x = this._moveX + Global.Const.GAME_WIDTH;
            }
        };
        return BackgroundUI;
    }(Sprite));
    Game.BackgroundUI = BackgroundUI;
})(Game || (Game = {}));
//# sourceMappingURL=BackgroundUI.js.map