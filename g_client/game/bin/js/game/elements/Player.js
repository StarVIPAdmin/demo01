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
    // 玩家类标识（用于对象池回收）
    Game.PLAYER_CLASS_SIGN = "player";
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
                return Game.DataMgr.instance.getPlayerData(this.id);
            },
            enumerable: true,
            configurable: true
        });
        /** 重写父类函数 */
        Player.prototype.init = function (id) {
            _super.prototype.init.call(this, id);
            this.foodId = 0;
            this.powerDelta = this.data.powerDelta;
            // 定时器检测
            Laya.timer.loop(1000, this, this.onLoop);
        };
        /** 重写父类函数 */
        Player.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            Laya.timer.clear(this, this.onLoop);
            Laya.Pool.recover(Game.PLAYER_CLASS_SIGN, this);
        };
        Player.prototype.onLoop = function () {
            // 更新玩家的体力
            var newVal = this.data.curPower + this.powerDelta;
            this.data.curPower = newVal;
            var percent = this.data.curPower / this.data.totalPower;
            this.event(Global.Event.ON_UPDATE_POWER, [percent]);
            // 体力不足
            if (this.foodId != 0) {
                if (newVal <= 0) {
                    this.event(Global.Event.RESET_FOOD, [this.foodId]);
                    this.foodId = 0;
                }
            }
        };
        /** 获取一个buff */
        Player.prototype.onGetBuff = function (cfgId) {
            this.data.walkSpeed = this.data.walkSpeed + 1;
        };
        /** 处在回收点范围 */
        Player.prototype.inRecycleArea = function () {
            // 回收食物
            if (this.foodId != 0) {
                var foodData = Game.DataMgr.instance.getFoodData(this.foodId);
                this.addScore(foodData.score);
                this.event(Global.Event.RECYCLE_FOOD, [this.foodId]);
                this.foodId = 0;
            }
            this.powerDelta = this.data.powerDelta * 5;
            this.data.state = Data.PlayerState.PROTECT;
        };
        /** 离开回收点范围 */
        Player.prototype.outRecycleArea = function () {
            this.powerDelta = this.data.powerDelta;
            this.data.state = Data.PlayerState.IDE;
        };
        /** 搬运食物 */
        Player.prototype.onCarryFood = function (food) {
            this.foodId = food.data.id;
            food.setCarryState();
            food.pos(0, 0);
            this.addChild(food);
            this.powerDelta = -food.data.weight * 2;
        };
        /** 增加积分 */
        Player.prototype.addScore = function (score) {
            this.data.score = this.data.score + score;
        };
        /** 从场景移除（返回对象池） */
        Player.prototype.remove = function () {
        };
        return Player;
    }(Game.BaseElement));
    Game.Player = Player;
    /**
     * 玩家类容器
     */
    var PlayerContainer = /** @class */ (function (_super) {
        __extends(PlayerContainer, _super);
        function PlayerContainer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PlayerContainer.prototype.init = function (parentContainer) {
            this._mapContainer = parentContainer;
            this._playerList = [];
        };
        /** 重置玩家 */
        PlayerContainer.prototype.resetPlayer = function () {
            var _this = this;
            // 清理旧数据
            this.clearPlayer();
            var dataList = Game.DataMgr.instance.otherPlayerData;
            if (dataList == null || dataList.length == 0) {
                return;
            }
            dataList.forEach(function (data) {
                var player = Game.ResMgr.instance.createPlayer(data.id);
                _this.addChild(player);
                _this._playerList[data.id] = player;
            });
        };
        /** 根据唯一ID，增加指定玩家 */
        PlayerContainer.prototype.addPlayer = function (id) {
            if (this.checkPlayer(id)) {
                return;
            }
            var player = Game.ResMgr.instance.createPlayer(id);
            this.addChild(player);
            this._playerList[id] = player;
        };
        /** 根据唯一ID，移除指定玩家 */
        PlayerContainer.prototype.removePlayer = function (id) {
            if (!this.checkPlayer(id))
                return;
            var player = this._playerList[id];
            player.destroy();
            this._playerList[id] = null;
        };
        /** 清除玩家 */
        PlayerContainer.prototype.clearPlayer = function () {
            if (!this.checkPlayerList())
                return;
            this._playerList.forEach(function (item) {
                item.destroy();
            });
            this._playerList = [];
        };
        /** 检测玩家列表是否有数据 */
        PlayerContainer.prototype.checkPlayerList = function () {
            return !(this._playerList == null || this._playerList.length == 0);
        };
        /** 根据唯一ID，检测玩家是否存在 */
        PlayerContainer.prototype.checkPlayer = function (id) {
            if (!this.checkPlayerList()) {
                return false;
            }
            return this._playerList[id] != null;
        };
        return PlayerContainer;
    }(Sprite));
    Game.PlayerContainer = PlayerContainer;
})(Game || (Game = {}));
//# sourceMappingURL=Player.js.map