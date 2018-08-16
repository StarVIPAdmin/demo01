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
    /**
     * 事件管理器（派发，监听事件）
     */
    var EventMgr = /** @class */ (function (_super) {
        __extends(EventMgr, _super);
        function EventMgr() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(EventMgr, "instance", {
            /** 获取单例实例 */
            get: function () {
                return _super.getInstanceOrCreate.call(this, EventMgr);
            },
            enumerable: true,
            configurable: true
        });
        /** 重写父类函数 */
        EventMgr.prototype.onCreate = function () {
        };
        /** 重写父类函数 */
        EventMgr.prototype.onDestroy = function () {
        };
        return EventMgr;
    }(Core.BaseSingleton));
    Game.EventMgr = EventMgr;
})(Game || (Game = {}));
//# sourceMappingURL=EventMgr.js.map