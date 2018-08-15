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
                return Game.DataMgr.instance.getRecycleData(this.id);
            },
            enumerable: true,
            configurable: true
        });
        /** 重写父类函数 */
        Recycle.prototype.init = function () {
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
        /** 创建回收点 */
        RecycleContainer.prototype.createRecycle = function (id) {
            var recycle = new Recycle(id);
            recycle.init();
            return recycle;
        };
        /** 重置回收点 */
        RecycleContainer.prototype.resetRecycle = function () {
            var _this = this;
            // 清理旧数据
            this.clearRecycle();
            var dataList = Game.DataMgr.instance.recycleDataList;
            if (dataList == null || dataList.length == 0) {
                return;
            }
            dataList.forEach(function (data) {
                var recycle = _this.createRecycle(data.id);
                _this.addChild(recycle);
                _this._recycleList[data.id] = recycle;
            });
        };
        /** 清除回收点 */
        RecycleContainer.prototype.clearRecycle = function () {
            if (this._recycleList == null || this._recycleList.length == 0) {
                return;
            }
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