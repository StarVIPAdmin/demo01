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
     * 游戏结束类
     */
    var GameOverUI = /** @class */ (function (_super) {
        __extends(GameOverUI, _super);
        function GameOverUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GameOverUI.prototype.onInit = function () {
            this.width = Global.Const.GAME_WIDTH;
            this.height = Global.Const.GAME_HEIGHT;
            this._bg = new Sprite();
            this._bg.alpha = 0.8;
            this._bg.graphics.drawRect(0, 0, this.width, this.height, "#000000");
            this.addChild(this._bg);
            this._descTxt = new Text();
            this._descTxt.fontSize = 30;
            this._descTxt.color = "#ffffff";
            this._descTxt.text = "开始游戏\n\n点击开始";
            this._descTxt.width = this.width;
            this._descTxt.align = "center";
            this.addChild(this._descTxt);
            this.once(Laya.Event.MOUSE_DOWN, this, this.onGameOver);
        };
        GameOverUI.prototype.onShow = function (Score) {
            this.setScore(Score);
        };
        GameOverUI.prototype.setScore = function (NewScore) {
            var score = localStorage.getItem("runGameScore");
            if (score && parseInt(score) > NewScore) {
                NewScore = parseInt(score);
            }
            localStorage.setItem("runGameScore", NewScore.toString());
            this._descTxt.text = "开始结束\n\n点击重新开始\n\n最终得分：" + NewScore;
            this._descTxt.y = 0.5 * (Global.Const.GAME_HEIGHT - this._descTxt.height);
        };
        GameOverUI.prototype.onGameOver = function () {
            location.reload();
        };
        return GameOverUI;
    }(Sprite));
    Game.GameOverUI = GameOverUI;
})(Game || (Game = {}));
//# sourceMappingURL=GameOverUI.js.map