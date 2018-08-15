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
     * 网络协议管理类
     */
    var NetMgr = /** @class */ (function (_super) {
        __extends(NetMgr, _super);
        function NetMgr() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(NetMgr, "instance", {
            /** 获取单例实例 */
            get: function () {
                return _super.getInstanceOrCreate.call(this, NetMgr);
            },
            enumerable: true,
            configurable: true
        });
        /** 重写父类函数 */
        NetMgr.prototype.onCreate = function () {
        };
        /** 重写父类函数 */
        NetMgr.prototype.onDestroy = function () {
        };
        return NetMgr;
    }(Core.BaseSingleton));
    Game.NetMgr = NetMgr;
})(Game || (Game = {}));
//# sourceMappingURL=NetMgr.js.map