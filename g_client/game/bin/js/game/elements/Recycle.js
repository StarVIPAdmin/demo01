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
    var Recycle = /** @class */ (function (_super) {
        __extends(Recycle, _super);
        function Recycle() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Recycle.prototype, "data", {
            get: function () {
                return Data.recycleDataList[this.id];
            },
            enumerable: true,
            configurable: true
        });
        /** 重写父类函数 */
        Recycle.prototype.init = function () {
            this.size(512, 512);
            _super.prototype.init.call(this);
        };
        /** 重写父类函数 */
        Recycle.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        return Recycle;
    }(Game.BaseElement));
    var RecycleContainer = /** @class */ (function (_super) {
        __extends(RecycleContainer, _super);
        function RecycleContainer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RecycleContainer.prototype.init = function () {
            this._recycleList = [];
        };
        RecycleContainer.prototype.createRecycle = function (id) {
            var recycle = new Recycle(id);
            recycle.init();
            return recycle;
        };
        RecycleContainer.prototype.addRecycle = function () {
            var recycle;
            for (var i = 0; i < 3; i++) {
                recycle = this.createRecycle(i);
                recycle.pos(i * 100, i * 100);
                this.addChild(recycle);
                this._recycleList[i] = recycle;
            }
        };
        RecycleContainer.prototype.removeRecycle = function (id) {
            var recycle = this._recycleList[id];
            recycle.destroy();
            this._recycleList[id] = null;
        };
        RecycleContainer.prototype.clearRecycle = function () {
            this._recycleList.forEach(function (item) {
                item.destroy();
            });
            this._recycleList = [];
        };
        return RecycleContainer;
    }(Sprite));
    Game.RecycleContainer = RecycleContainer;
})(Game || (Game = {}));
//# sourceMappingURL=Recycle.js.map