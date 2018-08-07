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
    var Event = Laya.Event;
    /**
     * 游戏主UI
     */
    var GameMainUI = /** @class */ (function (_super) {
        __extends(GameMainUI, _super);
        function GameMainUI() {
            var _this = _super.call(this) || this;
            _this.init();
            _this.initEvent();
            return _this;
        }
        GameMainUI.prototype.init = function () {
            this._powerBar = new Game.ProgressBar(Global.Const.BAR_TYPE_MP);
            this._powerBar.pos(10, 7);
            this.addChild(this._powerBar);
            this._attack = Game.ResMgr.getInstance().createText();
            this._attack.pos(10, 27);
            this.addChild(this._attack);
            this._speed = Game.ResMgr.getInstance().createText();
            this._speed.pos(10, 47);
            this.addChild(this._speed);
            this._score = Game.ResMgr.getInstance().createText();
            this._score.align = "right";
            this._score.pos(Global.Const.GAME_WIDTH - 120, 7);
            this.addChild(this._score);
            this._moveBG = new Sprite();
            this._moveBG.graphics.clear();
            this.addChild(this._moveBG);
            this._moveBG.graphics.drawTexture(Laya.loader.getRes(Global.Path.PNG_COMBAT_MOVE_BG), 0, 0, 222, 222);
            this._moveBG.pivot(111, 111);
            this._moveBG.size(222, 222);
            this._moveBG.pos(120, Global.Const.GAME_HEIGHT - 120);
            this._moveIcon = new Sprite();
            this._moveIcon.graphics.clear();
            this._moveBG.addChild(this._moveIcon);
            this._moveIcon.pivot(47, 47);
            this._moveIcon.graphics.drawTexture(Laya.loader.getRes(Global.Path.PNG_COMBAT_MOVE_ICON), 111, 111, 95, 95);
            this.refreshAttackTxt(0);
            this.refreshSpeedTxt(0);
            this.refreshScoreTxt(0);
        };
        GameMainUI.prototype.initEvent = function () {
            this._moveBG.on(Event.MOUSE_UP, this, this.onMouseUp);
            this._moveBG.on(Event.MOUSE_DOWN, this, this.onMouseDown);
            this._moveBG.on(Event.MOUSE_MOVE, this, this.onMouseMove);
        };
        // 刷新得分
        GameMainUI.prototype.refreshScoreTxt = function (Value) {
            this._score.text = "得分：" + Value;
        };
        // 刷新战斗力
        GameMainUI.prototype.refreshAttackTxt = function (Value) {
            this._attack.text = "攻击力：" + Value;
        };
        // 刷新速度
        GameMainUI.prototype.refreshSpeedTxt = function (Value) {
            this._speed.text = "速度：" + Value;
        };
        GameMainUI.prototype.onMouseUp = function (evt) {
            this._moveBG.alpha = 1;
            this._moveIcon.pos(111, 111);
            this._score.text = "333";
        };
        GameMainUI.prototype.onMouseDown = function (evt) {
            this._moveBG.alpha = 0.6;
            this._score.text = "222";
        };
        GameMainUI.prototype.onMouseMove = function (evt) {
            this._score.text = "111";
        };
        return GameMainUI;
    }(Sprite));
    Game.GameMainUI = GameMainUI;
})(Game || (Game = {}));
//# sourceMappingURL=GameMainUI.js.map