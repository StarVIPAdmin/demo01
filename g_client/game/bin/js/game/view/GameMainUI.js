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
     * 游戏主UI
     */
    var GameMainUI = /** @class */ (function (_super) {
        __extends(GameMainUI, _super);
        function GameMainUI() {
            var _this = _super.call(this) || this;
            // 摇杆半径/长/宽
            _this.MOVE_BG_RADIUS = 80;
            _this.MOVE_BG_WIDTH = 222;
            _this.MOVE_BG_HEIGHT = 222;
            _this.MOVE_ICON_WIDTH = 95;
            _this.MOVE_ICON_HEIGHT = 95;
            _this.initData();
            _this.initUI();
            return _this;
        }
        GameMainUI.prototype.initData = function () {
            this._powerBar = null;
            this._attack = null;
            this._speed = null;
            this._score = null;
            this._moveBG = null;
            this._moveIcon = null;
            this._canMove = false;
            this._halfMoveBGWidth = this.MOVE_BG_WIDTH * 0.5;
            this._halfMoveBGHeight = this.MOVE_BG_HEIGHT * 0.5;
            this._halfMoveIconWidth = this.MOVE_ICON_WIDTH * 0.5;
            this._halfMoveIconHeight = this.MOVE_ICON_HEIGHT * 0.5;
        };
        GameMainUI.prototype.initUI = function () {
            this._powerBar = new Game.ProgressBar();
            this._powerBar.init();
            this._powerBar.pos(10, 7);
            this.addChild(this._powerBar);
            this._attack = Game.ResMgr.instance.createText();
            this._attack.pos(10, 37);
            this.addChild(this._attack);
            this._speed = Game.ResMgr.instance.createText();
            this._speed.pos(120, 37);
            this.addChild(this._speed);
            this._score = Game.ResMgr.instance.createText();
            this._score.align = "right";
            this._score.pos(Global.Const.GAME_WIDTH - 120, 7);
            this.addChild(this._score);
            this._moveBG = new Sprite();
            this._moveBG.graphics.clear();
            this.addChild(this._moveBG);
            this._moveBG.graphics.drawTexture(Laya.loader.getRes(Global.Path.PNG_COMBAT_MOVE_BG), 0, 0, this.MOVE_BG_WIDTH, this.MOVE_BG_HEIGHT);
            this._moveBG.size(this.MOVE_BG_WIDTH, this.MOVE_BG_HEIGHT).pos(30, Global.Const.GAME_HEIGHT - this.MOVE_BG_HEIGHT - 30);
            this._moveIcon = new Sprite();
            this._moveIcon.graphics.clear();
            this._moveBG.addChild(this._moveIcon);
            this._moveIcon.graphics.drawTexture(Laya.loader.getRes(Global.Path.PNG_COMBAT_MOVE_ICON), 0, 0, this.MOVE_ICON_WIDTH, this.MOVE_ICON_HEIGHT);
            this.setMoveIconPos(this._halfMoveBGWidth, this._halfMoveBGHeight);
            this._carryIcon = Game.ResMgr.instance.createSprite(Global.Path.PNG_CARRY_ICON, 204, 204);
            this._carryIcon.pos(Global.Const.GAME_WIDTH - 234, Global.Const.GAME_HEIGHT - 234);
            this.addChild(this._carryIcon);
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
            this._canMove = false;
            this._moveBG.alpha = 1;
            this.setMoveIconPos(this._halfMoveBGWidth, this._halfMoveBGHeight);
        };
        GameMainUI.prototype.onMouseDown = function (evt) {
            var mouseX = Laya.stage.mouseX;
            var mouseY = Laya.stage.mouseY;
            this._canMove = this._moveBG.hitTestPoint(mouseX, mouseY);
            if (this._canMove) {
                this._moveBG.alpha = 0.6;
                this.refreshMoveIconPos();
            }
        };
        GameMainUI.prototype.onMouseMove = function (evt) {
            if (this._canMove) {
                this.refreshMoveIconPos();
            }
        };
        // 更新摇杆坐标
        GameMainUI.prototype.refreshMoveIconPos = function () {
            var initPosx = this._moveBG.x + this._halfMoveBGWidth;
            var initPosy = this._moveBG.y + this._halfMoveBGHeight;
            var touchPosx = Laya.stage.mouseX;
            var touchPosy = Laya.stage.mouseY;
            var deltaPosx = touchPosx - initPosx;
            var deltaPosy = touchPosy - initPosy;
            var distance = Math.sqrt(deltaPosx * deltaPosx + deltaPosy * deltaPosy);
            if (distance > this.MOVE_BG_RADIUS) {
                var targetPosx = this.MOVE_BG_RADIUS * deltaPosx / distance + this._halfMoveBGWidth;
                var targetPosy = this.MOVE_BG_RADIUS * deltaPosy / distance + this._halfMoveBGHeight;
                this.setMoveIconPos(targetPosx, targetPosy);
            }
            else {
                this.setMoveIconPos(touchPosx - this._moveBG.x, touchPosy - this._moveBG.y);
            }
        };
        // 设置摇杆坐标
        GameMainUI.prototype.setMoveIconPos = function (PosX, PosY) {
            this._moveIcon.pos(PosX - this._halfMoveIconWidth, PosY - this._halfMoveIconHeight);
        };
        // 获取行走角度
        GameMainUI.prototype.getMoveIconAngle = function () {
            if (!this._canMove)
                return 0;
            var moveIconPosX = this._moveIcon.x + this._halfMoveIconWidth;
            var moveIconPosY = this._moveIcon.y + this._halfMoveIconHeight;
            return Math.atan2(moveIconPosY - this._halfMoveBGHeight, moveIconPosX - this._halfMoveBGWidth);
        };
        return GameMainUI;
    }(Sprite));
    Game.GameMainUI = GameMainUI;
})(Game || (Game = {}));
//# sourceMappingURL=GameMainUI.js.map