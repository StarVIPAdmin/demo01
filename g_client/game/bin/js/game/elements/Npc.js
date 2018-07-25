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
    var BIRD = "bird";
    /**
     * 电脑AI
     */
    var Npc = /** @class */ (function (_super) {
        __extends(Npc, _super);
        function Npc() {
            var _this = _super.call(this) || this;
            _this._body = null;
            _this.init();
            return _this;
        }
        Npc.prototype.init = function () {
            if (!cached) {
                cached = true;
                Animation.createFrames([Global.Path.PNG_BIRD_1, Global.Path.PNG_BIRD_2, Global.Path.PNG_BIRD_3, Global.Path.PNG_BIRD_4], BIRD);
            }
            if (this._body == null) {
                this._body = new Animation();
                this._body.interval = 100;
                this.addChild(this._body);
            }
            this._body.x = Global.Const.GAME_WIDTH;
            this._body.y = Math.random() * Global.Const.GAME_HEIGHT;
            this._body.play(0, true, BIRD);
            Laya.timer.frameLoop(1, this, this.onLoop);
        };
        Npc.prototype.onLoop = function () {
            if (Data.isOver) {
                return;
            }
            this._body.x -= Data.speed * 1.5;
            if (this._body.x < -100) {
                this.removeSelf();
                Laya.Pool.recover("npc", this);
                Laya.timer.clear(this, this.onLoop);
            }
        };
        return Npc;
    }(Sprite));
    Game.Npc = Npc;
})(Game || (Game = {}));
//# sourceMappingURL=Npc.js.map