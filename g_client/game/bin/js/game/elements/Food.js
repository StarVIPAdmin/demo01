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
    // food类标识（用于对象池回收）
    var FOOD_CLASS_SIGN = "food";
    /**
     * 食物类
     */
    var Food = /** @class */ (function (_super) {
        __extends(Food, _super);
        function Food() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Food.prototype, "data", {
            get: function () {
                return Game.DataMgr.instance.getFoodData(this.id);
            },
            enumerable: true,
            configurable: true
        });
        /** 重写父类函数 */
        Food.prototype.init = function (id) {
            _super.prototype.init.call(this, id);
            this._isLock = false;
            // 定时器检测
            Laya.timer.frameLoop(1, this, this.onLoop);
        };
        /** 重写父类函数 */
        Food.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            Laya.timer.clear(this, this.onLoop);
            Laya.Pool.recover(FOOD_CLASS_SIGN, this);
        };
        /** 设置被搬运状态 */
        Food.prototype.setCarryState = function () {
            this.data.state = Data.FoodState.CARRY;
            Laya.timer.clear(this, this.onLoop);
            this._isLock = false;
            Game.EventMgr.instance.event(Global.Event.SET_CARRY_ICON_VISIBLE, [0]);
            this.removeSelf();
        };
        /** 食物掉落 */
        Food.prototype.dropout = function () {
            this._isLock = false;
            this.data.state = Data.FoodState.DEATH;
            this.removeSelf();
            Laya.timer.frameLoop(1, this, this.onLoop);
        };
        Food.prototype.onLoop = function () {
            if (Game.DataMgr.instance.roleData.foodId != 0) {
                return;
            }
            var parent = this.parent;
            var isTouch = parent.mapContainer.checkPlayerCollision(this.x, this.y, this.data.collisionRadius);
            if (isTouch) {
                this._isLock = true;
                switch (this.data.state) {
                    case Data.FoodState.LIVE:
                        this.checkFoodType();
                        break;
                    case Data.FoodState.DEATH:
                        Game.EventMgr.instance.event(Global.Event.SET_CARRY_ICON_VISIBLE, [this.data.id]);
                        break;
                    case Data.FoodState.CARRY:
                        break;
                }
            }
            else if (this._isLock) {
                this._isLock = false;
                Game.EventMgr.instance.event(Global.Event.SET_CARRY_ICON_VISIBLE, [0]);
            }
        };
        /** 检测食物类型 */
        Food.prototype.checkFoodType = function () {
            switch (this.data.type) {
                case Data.FoodType.BOTANY:
                    // 植物
                    Game.EventMgr.instance.event(Global.Event.SET_CARRY_ICON_VISIBLE, [this.data.id]);
                    break;
                case Data.FoodType.ANIMAL:
                    // 动物
                    if (this.data.attack > Game.DataMgr.instance.roleData.attack) {
                        // 玩家死亡
                        Game.EventMgr.instance.event(Global.Event.GAME_OVER);
                    }
                    else {
                        // 杀死动物
                        this.data.state = Data.FoodState.DEATH;
                        Game.EventMgr.instance.event(Global.Event.SET_CARRY_ICON_VISIBLE, [this.data.id]);
                    }
                    break;
            }
        };
        return Food;
    }(Game.BaseElement));
    Game.Food = Food;
    /**
     * 食物类容器
     */
    var FoodContainer = /** @class */ (function (_super) {
        __extends(FoodContainer, _super);
        function FoodContainer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(FoodContainer.prototype, "mapContainer", {
            get: function () {
                return this._mapContainer;
            },
            enumerable: true,
            configurable: true
        });
        FoodContainer.prototype.init = function (parentContainer) {
            this._mapContainer = parentContainer;
            this._foodList = [];
        };
        /** 创建食物 */
        FoodContainer.prototype.createFood = function (id) {
            var food = Laya.Pool.getItemByClass(FOOD_CLASS_SIGN, Food);
            food.init(id);
            return food;
        };
        /** 重置食物 */
        FoodContainer.prototype.resetFood = function () {
            var _this = this;
            // 清理旧数据
            this.clearFood();
            var dataList = Game.DataMgr.instance.foodDataList;
            if (dataList == null || dataList.length == 0) {
                return;
            }
            dataList.forEach(function (data) {
                _this.showFood(data.id, data.posIdx);
            });
        };
        /** 根据唯一ID，增加指定食物 */
        FoodContainer.prototype.addFood = function (id) {
            if (this.checkFood(id)) {
                return;
            }
            var data = Game.DataMgr.instance.getFoodData(id);
            this.showFood(id, data.posIdx);
        };
        /** 根据唯一ID，移除指定食物 */
        FoodContainer.prototype.removeFood = function (id) {
            if (!this.checkFood(id))
                return;
            var food = this._foodList[id];
            food.destroy();
            this._foodList[id] = null;
            Game.DataMgr.instance.removeFoodData(id);
        };
        /** 清除食物 */
        FoodContainer.prototype.clearFood = function () {
            if (!this.checkFoodList()) {
                return;
            }
            this._foodList.forEach(function (item) {
                item.destroy();
            });
            this._foodList = [];
            Game.DataMgr.instance.foodDataList = [];
        };
        /** 获取场景食物 */
        FoodContainer.prototype.getFood = function (id) {
            return this._foodList[id];
        };
        /** 掉落食物 */
        FoodContainer.prototype.dropoutFood = function (id) {
            var food = this.getFood(id);
            if (food != null) {
                food.data.state = Data.FoodState.DEATH;
                food.dropout();
                food.pos(Game.DataMgr.instance.roleData.x - this.mapContainer.x, Game.DataMgr.instance.roleData.y - this.mapContainer.y);
                this.addChild(food);
            }
        };
        /** 检测食物列表是否有数据 */
        FoodContainer.prototype.checkFoodList = function () {
            return !(this._foodList == null || this._foodList.length == 0);
        };
        /** 根据唯一ID，检测食物是否存在 */
        FoodContainer.prototype.checkFood = function (id) {
            if (!this.checkFoodList()) {
                return false;
            }
            return this._foodList[id] != null;
        };
        /** 显示食物 */
        FoodContainer.prototype.showFood = function (id, posIdx) {
            var pos = this.mapContainer.mainScene.sceneData.getFoodPosByIdx(posIdx);
            var food = this.createFood(id);
            food.pos(pos.x, pos.y);
            this.addChild(food);
            this._foodList[id] = food;
        };
        return FoodContainer;
    }(Sprite));
    Game.FoodContainer = FoodContainer;
})(Game || (Game = {}));
//# sourceMappingURL=Food.js.map