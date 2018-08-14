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
     * 食物类
     */
    var Food = /** @class */ (function (_super) {
        __extends(Food, _super);
        function Food() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Food.prototype, "data", {
            get: function () {
                return Data.foodDataList[this.id];
            },
            enumerable: true,
            configurable: true
        });
        /** 重写父类函数 */
        Food.prototype.init = function () {
            this.size(128, 128);
            _super.prototype.init.call(this);
        };
        /** 重写父类函数 */
        Food.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
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
        FoodContainer.prototype.init = function () {
            this._foodList = [];
        };
        FoodContainer.prototype.createFood = function (id) {
            var food = new Food(id);
            food.init();
            return food;
        };
        FoodContainer.prototype.addFood = function () {
            var food;
            for (var i = 0; i < 5; i++) {
                food = this.createFood(i);
                food.pos(i * 10, i * 10);
                this.addChild(food);
                this._foodList[i] = food;
            }
        };
        FoodContainer.prototype.removeFood = function (id) {
            var food = this._foodList[id];
            food.destroy();
            this._foodList[id] = null;
        };
        FoodContainer.prototype.clearFood = function () {
            this._foodList.forEach(function (item) {
                item.destroy();
            });
            this._foodList = [];
        };
        return FoodContainer;
    }(Sprite));
    Game.FoodContainer = FoodContainer;
})(Game || (Game = {}));
//# sourceMappingURL=Food.js.map