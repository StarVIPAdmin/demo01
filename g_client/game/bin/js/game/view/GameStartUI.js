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
    var Text = Laya.Text;
    /**
     * 游戏开始UI
     */
    var GameStartUI = /** @class */ (function (_super) {
        __extends(GameStartUI, _super);
        function GameStartUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GameStartUI.prototype.onInit = function () {
            this.width = Global.Const.GAME_WIDTH;
            this.height = Global.Const.GAME_HEIGHT;
            this._bg = new Sprite();
            this._bg.alpha = 0.8;
            this._bg.graphics.drawRect(0, 0, this.width, this.height, "#000000");
            this.addChild(this._bg);
            this._descTxt = new Text();
            this._descTxt.fontSize = 20;
            this._descTxt.color = "#ffffff";
            this._descTxt.text = "游戏介绍\n\n疯狂的蚂蚁";
            this._descTxt.width = this.width;
            this._descTxt.align = "center";
            this._descTxt.y = 0.5 * (this.height - this._descTxt.height);
            this.addChild(this._descTxt);
            this.once(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        };
        GameStartUI.prototype.onMouseDown = function () {
            Game.viewMgr.hideView(Global.ViewId.GAME_INFO_UI);
            Game.DataMgr.instance.isGameOver = false;
        };
        return GameStartUI;
    }(Sprite));
    Game.GameStartUI = GameStartUI;
})(Game || (Game = {}));
//# sourceMappingURL=GameStartUI.js.map