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
    var PlayerData = Data.PlayerData;
    var FoodData = Data.FoodData;
    var BuffData = Data.BuffData;
    var RecycleData = Data.RecycleData;
    /**
     * 游戏数据管理类
     */
    var DataMgr = /** @class */ (function (_super) {
        __extends(DataMgr, _super);
        function DataMgr() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(DataMgr, "instance", {
            /** 获取单例实例 */
            get: function () {
                return _super.getInstanceOrCreate.call(this, DataMgr);
            },
            enumerable: true,
            configurable: true
        });
        /** 重写父类函数 */
        DataMgr.prototype.onCreate = function () {
            this.isGameOver = false;
            this.otherPlayerData = [];
            this.foodDataList = [];
            this.buffDataList = [];
            this.recycleDataList = [];
        };
        /** 重写父类函数 */
        DataMgr.prototype.onDestroy = function () {
            this.otherPlayerData = null;
            this.foodDataList = null;
            this.buffDataList = null;
            this.recycleDataList = null;
        };
        /** 创建玩家数据 */
        DataMgr.prototype.createPlayerData = function (id) {
            var data = new PlayerData(id);
            data.init();
            return data;
        };
        /** 创建食物数据 */
        DataMgr.prototype.createFoodData = function (id) {
            var data = new FoodData(id);
            data.init();
            return data;
        };
        /** 创建药剂BUFF数据 */
        DataMgr.prototype.createBuffData = function (id) {
            var data = new BuffData(id);
            data.init();
            return data;
        };
        /** 创建回收点数据 */
        DataMgr.prototype.createRecycleData = function (id) {
            var data = new RecycleData(id);
            data.init();
            return data;
        };
        /** 获取玩家数据 */
        DataMgr.prototype.getPlayerData = function (id) {
            if (this.myPlayerData.id == id) {
                return this.myPlayerData;
            }
            else {
                return this.otherPlayerData[id];
            }
        };
        /** 获取食物数据 */
        DataMgr.prototype.getFoodData = function (id) {
            return this.foodDataList[id];
        };
        /** 获取buff数据 */
        DataMgr.prototype.getBuffData = function (id) {
            return this.buffDataList[id];
        };
        /** 获取回收点数据 */
        DataMgr.prototype.getRecycleData = function (id) {
            return this.recycleDataList[id];
        };
        // 测试初始化数据
        DataMgr.prototype.testInitData = function () {
            this.myPlayerData = this.createPlayerData(1);
            this.myPlayerData.x = Global.Const.GAME_WIDTH * 0.5;
            this.myPlayerData.y = Global.Const.GAME_HEIGHT * 0.5;
            var id_buff = 10;
            var id_food = 100;
            var id_player = 50;
            var id_recycle = 80;
            var id;
            for (var i = 0; i < 5; i++) {
                id = i + id_buff;
                this.buffDataList[id] = this.createBuffData(id);
            }
            for (var i = 0; i < 20; i++) {
                id = i + id_food;
                this.foodDataList[id] = this.createFoodData(id);
            }
            for (var i = 0; i < 3; i++) {
                id = i + id_recycle;
                this.recycleDataList[id] = this.createRecycleData(id);
            }
            for (var i = 0; i < 10; i++) {
                id = i + id_player;
                this.otherPlayerData[id] = this.createPlayerData(id);
            }
        };
        return DataMgr;
    }(Core.BaseSingleton));
    Game.DataMgr = DataMgr;
})(Game || (Game = {}));
//# sourceMappingURL=DataMgr.js.map