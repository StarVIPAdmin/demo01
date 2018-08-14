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
     * 食物回收点
     */
    var FoodRecycle = /** @class */ (function (_super) {
        __extends(FoodRecycle, _super);
        function FoodRecycle() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(FoodRecycle.prototype, "data", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        /** 重写父类函数 */
        FoodRecycle.prototype.init = function () {
            this.size(512, 512);
            _super.prototype.init.call(this);
        };
        /** 重写父类函数 */
        FoodRecycle.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        return FoodRecycle;
    }(Game.BaseElement));
    var FoodRecycleContainer = /** @class */ (function (_super) {
        __extends(FoodRecycleContainer, _super);
        function FoodRecycleContainer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FoodRecycleContainer.prototype.createFoodRecycle = function (id) {
            var foodRecycle = new FoodRecycle(id);
            foodRecycle.init();
            return foodRecycle;
        };
        FoodRecycleContainer.prototype.addFoodRecycle = function () {
        };
        FoodRecycleContainer.prototype.removeFoodRecycle = function () {
        };
        FoodRecycleContainer.prototype.clearFoodRecycle = function () {
        };
        return FoodRecycleContainer;
    }(Sprite));
    Game.FoodRecycleContainer = FoodRecycleContainer;
})(Game || (Game = {}));
//# sourceMappingURL=FoodRecycle.js.map