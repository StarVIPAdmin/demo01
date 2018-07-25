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
     * 游戏介绍类
     */
    var GameInfoUI = /** @class */ (function (_super) {
        __extends(GameInfoUI, _super);
        function GameInfoUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GameInfoUI.prototype.onInit = function () {
            this.width = Global.Const.GAME_WIDTH;
            this.height = Global.Const.GAME_HEIGHT;
            this._bg = new Sprite();
            this._bg.alpha = 0.8;
            this._bg.graphics.drawRect(0, 0, this.width, this.height, "#000000");
            this.addChild(this._bg);
            this._txt = new Text();
            this._txt.fontSize = 20;
            this._txt.color = "#ffffff";
            this._txt.text = "游戏介绍\n\n点击可控制人物跳跃\n\n（小提示 点两次可触发人物连跳 再连跳后 再次点击可出发人物飞行哦！）\n\n左上角紫色条代表当前飞行的精力 黄色条 代表加速状态\n\n\n好了 点击屏幕开始狂奔之旅吧~~";
            this._txt.width = this.width;
            this._txt.align = "center";
            this._txt.y = 0.5 * (this.height - this._txt.height);
            this.addChild(this._txt);
            this.once(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        };
        GameInfoUI.prototype.onMouseDown = function () {
            Game.viewMgr.hideView(Global.ViewId.GAME_INFO_UI);
            Data.isPause = false;
        };
        return GameInfoUI;
    }(Sprite));
    Game.GameInfoUI = GameInfoUI;
})(Game || (Game = {}));
//# sourceMappingURL=GameInfoUI.js.map