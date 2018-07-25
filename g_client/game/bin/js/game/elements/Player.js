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
    var Animation = Laya.Animation;
    var cached = false;
    /**
     * 玩家类
     */
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        // 残影
        // private _bodyEffect1:Animation;
        // private _bodyEffect2:Animation;
        // 特效
        // private _spiritEffect:Sprite;
        function Player(hpBar, mpBar) {
            var _this = _super.call(this) || this;
            _this._mpBar = hpBar;
            _this._hpBar = mpBar;
            _this._actName = null;
            _this._body = null;
            _this._jumpCount = 0;
            _this._jumpCountMax = 2;
            _this._vy = 0;
            _this._downSpeed = 2;
            _this._maxVy = 32;
            // this._bodyEffect1 = null;
            // this._bodyEffect2 = null;
            // this._spiritEffect = null;
            _this.width = 96;
            _this.height = 96;
            _this.init();
            return _this;
        }
        Player.prototype.init = function () {
            if (!cached) {
                cached = true;
                Animation.createFrames([Global.Path.PNG_PLAYER_CHARA_1, Global.Path.PNG_PLAYER_CHARA_2, Global.Path.PNG_PLAYER_CHARA_3, Global.Path.PNG_PLAYER_CHARA_4], Global.Const.PLAYER_STATE_RUN);
                Animation.createFrames([Global.Path.PNG_PLAYER_CHARA_5, Global.Path.PNG_PLAYER_CHARA_6, Global.Path.PNG_PLAYER_CHARA_7, Global.Path.PNG_PLAYER_CHARA_8], Global.Const.PLAYER_STATE_FLY);
                Animation.createFrames([Global.Path.PNG_PLAYER_CHARA_9, Global.Path.PNG_PLAYER_CHARA_10, Global.Path.PNG_PLAYER_CHARA_11, Global.Path.PNG_PLAYER_CHARA_12], Global.Const.PLAYER_STATE_HERT);
                Animation.createFrames([Global.Path.PNG_PLAYER_CHARA_13, Global.Path.PNG_PLAYER_CHARA_14, Global.Path.PNG_PLAYER_CHARA_15, Global.Path.PNG_PLAYER_CHARA_16], Global.Const.PLAYER_STATE_JUMP);
            }
            if (this._body == null) {
                // let texture = Laya.loader.getRes(Global.Path.PNG_SPIRIT_EFFECT);
                // this._spiritEffect = new Sprite();
                // this._spiritEffect.pivot(154 * 0.5, 190 * 0.5);
                // this._spiritEffect.visible = false;
                // this._spiritEffect.scale(5, 5);
                // this._spiritEffect.graphics.drawTexture(texture, 0, 0, 154, 190);
                // this.addChild(this._spiritEffect);
                // this._bodyEffect1 = new Animation();
                // this._bodyEffect1.alpha = 0.6;
                // this._bodyEffect1.pivot(80,60);
                // this._bodyEffect1.interval = 100;
                // this._bodyEffect1.visible = false;
                // this.addChild(this._bodyEffect1);
                // this._bodyEffect2 = new Animation();
                // this._bodyEffect2.alpha = 0.3;
                // this._bodyEffect2.pivot(110,60);
                // this._bodyEffect2.interval = 100;
                // this._bodyEffect2.visible = false;
                // this.addChild(this._bodyEffect2);
                this._body = new Animation();
                this._body.pivot(48, 60);
                this._body.interval = 100;
                this.addChild(this._body);
            }
            this.playAction(Global.Const.PLAYER_STATE_RUN);
            Laya.timer.frameLoop(1, this, this.onLoop);
        };
        Player.prototype.playAction = function (ActName) {
            if (this._actName == ActName) {
                return;
            }
            this._actName = ActName;
            this._body.play(0, true, this._actName);
            // this._bodyEffect1.play(0, true, this._actName);
            // this._bodyEffect2.play(0, true, this._actName);
        };
        Player.prototype.onLoop = function () {
            // 玩家开始下落
            this.y += this._vy;
            this._vy += this._downSpeed;
            if (this._vy > this._maxVy) {
                this._vy = this._maxVy;
            }
            // 判定玩家是否死亡
            if (this.y > (Global.Const.GAME_HEIGHT + 100)) {
                this.event(Global.Const.PLAYER_STATE_DIE, this);
                return;
            }
        };
        Player.prototype.gotoRun = function () {
            this.playAction(Global.Const.PLAYER_STATE_RUN);
        };
        Player.prototype.gotoJump = function () {
            this.playAction(Global.Const.PLAYER_STATE_JUMP);
        };
        Player.prototype.gotoFly = function () {
            this.playAction(Global.Const.PLAYER_STATE_FLY);
        };
        Player.prototype.gotoHert = function () {
            this.playAction(Global.Const.PLAYER_STATE_HERT);
        };
        // 二级跳
        Player.prototype.doubleJump = function () {
            if (this._jumpCount < this._jumpCountMax) {
                this._vy = -20;
                this._jumpCount++;
                this.gotoJump();
            }
            else {
                // this.gotoFly();
            }
        };
        // 跳跃结束重置
        Player.prototype.jumpReset = function () {
            this._vy = 0;
            this._jumpCount = 0;
            this.gotoRun();
        };
        return Player;
    }(Sprite));
    Game.Player = Player;
})(Game || (Game = {}));
//# sourceMappingURL=Player.js.map