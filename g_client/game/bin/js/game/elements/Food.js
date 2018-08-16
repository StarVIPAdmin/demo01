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
            // 定时器检测
            Laya.timer.frameLoop(1, this, this.onLoop);
        };
        /** 重写父类函数 */
        Food.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            Laya.timer.clear(this, this.onLoop);
            Laya.Pool.recover(FOOD_CLASS_SIGN, this);
        };
        Food.prototype.onLoop = function () {
            var parent = this.parent;
            var isTouch = parent.mapContainer.checkPlayerCollision(this.x, this.y, this.data.collisionRadius);
            if (isTouch) {
                switch (this.data.type) {
                    case Data.FoodType.BOTANY:
                        this.data.state = Data.FoodState.DEATH;
                        Game.EventMgr.instance.event(Global.Event.FOOD_GO_DIE, this);
                        break;
                    case Data.FoodType.ANIMAL:
                        if (this.data.state == Data.FoodState.DEATH)
                            break;
                }
            }
            else {
            }
        };
        return Food;
    }(Game.BaseElement));
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
                var food = _this.createFood(data.id);
                _this.addChild(food);
                _this._foodList[data.id] = food;
            });
        };
        /** 根据唯一ID，增加指定食物 */
        FoodContainer.prototype.addFood = function (id) {
            if (this.checkFood(id)) {
                return;
            }
            var food = this.createFood(id);
            this.addChild(food);
            this._foodList[id] = food;
        };
        /** 根据唯一ID，移除指定食物 */
        FoodContainer.prototype.removeFood = function (id) {
            if (!this.checkFood(id))
                return;
            var food = this._foodList[id];
            food.destroy();
            this._foodList[id] = null;
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
        return FoodContainer;
    }(Sprite));
    Game.FoodContainer = FoodContainer;
})(Game || (Game = {}));
//# sourceMappingURL=Food.js.map