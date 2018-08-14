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
        function Player() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Player.prototype, "data", {
            get: function () {
                if (this.id == Data.myPlayerData.id) {
                    return Data.myPlayerData;
                }
                else {
                    return Data.playerDataList[this.id];
                }
            },
            enumerable: true,
            configurable: true
        });
        /** 重写父类函数 */
        Player.prototype.init = function () {
            this.size(96, 96);
            _super.prototype.init.call(this);
            Laya.timer.frameLoop(1, this, this.onLoop);
        };
        /** 重写父类函数 */
        Player.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        Player.prototype.onLoop = function () {
            // 判定玩家是否死亡
            // if (this.y > (Global.Const.GAME_HEIGHT + 100)) {
            //     this.event(Global.Const.PLAYER_STATE_DIE, this);
            //     return;
            // }
        };
        Player.prototype.gotoRun = function () {
        };
        // 从场景移除（返回对象池）
        Player.prototype.remove = function () {
        };
        return Player;
    }(Game.BaseElement));
    /**
     * 玩家类容器
     */
    var PlayerContainer = /** @class */ (function (_super) {
        __extends(PlayerContainer, _super);
        function PlayerContainer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(PlayerContainer.prototype, "myPlayer", {
            get: function () {
                return this._myPlayer;
            },
            enumerable: true,
            configurable: true
        });
        PlayerContainer.prototype.init = function () {
            this._playerList = [];
        };
        PlayerContainer.prototype.createMyPlayer = function () {
            this._myPlayer = this.createPlayer(99);
            this._myPlayer.pos(Global.Const.GAME_WIDTH * 0.5, Global.Const.GAME_HEIGHT * 0.5);
            // this._myPlayer.on(Global.Const.PLAYER_STATE_DIE, this, this.playerDie);
            this.addChild(this._myPlayer);
        };
        PlayerContainer.prototype.createPlayer = function (id) {
            var player = new Player(id);
            player.init();
            return player;
        };
        PlayerContainer.prototype.addPlayer = function () {
            // let player:Player;
            for (var i = 0; i < 4; i++) {
                var player = this.createPlayer(i);
                player.pos(i * 200, i * 200);
                this.addChild(player);
                this._playerList[i] = player;
            }
        };
        PlayerContainer.prototype.removePlayer = function (id) {
            var player = this._playerList[id];
            player.destroy();
            this._playerList[id] = null;
        };
        PlayerContainer.prototype.clearPlayer = function () {
            this._playerList.forEach(function (item) {
                item.destroy();
            });
            this._playerList = [];
        };
        return PlayerContainer;
    }(Sprite));
    Game.PlayerContainer = PlayerContainer;
})(Game || (Game = {}));
//# sourceMappingURL=Player.js.map