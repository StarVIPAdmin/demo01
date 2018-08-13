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
     * 玩家类
     */
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        function Player(Id) {
            var _this = _super.call(this) || this;
            _this._id = Id;
            _this._name = null;
            _this._body = null;
            _this.size(96, 96);
            return _this;
        }
        Object.defineProperty(Player.prototype, "data", {
            get: function () {
                if (this._id == Data.myPlayerData.id) {
                    return Data.myPlayerData;
                }
                else {
                    return Data.playerDataList[this._id];
                }
            },
            enumerable: true,
            configurable: true
        });
        Player.prototype.init = function () {
            this.initData();
            this.initUI();
            Laya.timer.frameLoop(1, this, this.onLoop);
        };
        Player.prototype.initData = function () {
        };
        Player.prototype.initUI = function () {
            if (this._body == null) {
                this._body = Game.ResMgr.instance.createSprite(Global.Path.PNG_PLAYER_1, 128, 128);
                this.addChild(this._body);
            }
            if (this._name == null) {
                this._name = Game.ResMgr.instance.createText();
                this._name.align = "center";
                this._name.pos(this._body.width * 0.5 - this._name.width * 0.5, 0);
                this.addChild(this._name);
            }
            this._name.text = this.data.name;
        };
        Player.prototype.onLoop = function () {
            // 判定玩家是否死亡
            // if (this.y > (Global.Const.GAME_HEIGHT + 100)) {
            //     this.event(Global.Const.PLAYER_STATE_DIE, this);
            //     return;
            // }
        };
        Player.prototype.gotoRun = function () {
            // this.playAction(Global.Const.PLAYER_STATE_RUN);
        };
        // 从场景移除（返回对象池）
        Player.prototype.remove = function () {
        };
        // 销毁对象
        Player.prototype.destroy = function () {
        };
        return Player;
    }(Sprite));
    Game.Player = Player;
})(Game || (Game = {}));
//# sourceMappingURL=Player.js.map