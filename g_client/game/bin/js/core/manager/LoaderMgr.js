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
var Core;
(function (Core) {
    /**
     * 加载管理器
     */
    var LoaderMgr = /** @class */ (function (_super) {
        __extends(LoaderMgr, _super);
        function LoaderMgr() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** 获取单例实例 */
        LoaderMgr.getInstance = function () {
            return Core.BaseSingleton.getInstanceOrCreate(LoaderMgr);
        };
        LoaderMgr.prototype.loadRes = function (Url, LoadedFunc, LoadingFunc) {
            this._loadedFunc = LoadedFunc;
            this._loadingFunc = LoadingFunc;
            // 关闭并发加载，改成单一序列加载
            Laya.loader.maxLoader = 1;
            // 无加载失败重试
            Laya.loader.retryNum = 0;
            Laya.loader.load(Url, Laya.Handler.create(this, this.onLoaded), Laya.Handler.create(this, this.onLoading, null, false));
            Laya.loader.once(Laya.Event.ERROR, this, this.onLoadError);
        };
        LoaderMgr.prototype.onLoaded = function () {
            Laya.loader.off(Laya.Event.ERROR, this, this.onLoadError, true);
            Laya.loader.maxLoader = 5;
            Laya.timer.once(500, this, this.doLoadedCallback);
        };
        LoaderMgr.prototype.onLoading = function (Progress) {
            this.doLoadingCallback(Progress);
            if (Progress == 1) {
                this._loadingFunc = null;
            }
        };
        LoaderMgr.prototype.onLoadError = function (Str) {
            console.log("加载失败:", Str);
        };
        /**
         * 执行加载完成回调函数
         */
        LoaderMgr.prototype.doLoadedCallback = function () {
            if (this._loadedFunc) {
                this._loadedFunc();
                this._loadedFunc = null;
            }
        };
        /**
         * 执行加载中回调函数
         */
        LoaderMgr.prototype.doLoadingCallback = function (Progress) {
            if (this._loadingFunc) {
                this._loadingFunc(Progress);
            }
        };
        return LoaderMgr;
    }(Core.BaseSingleton));
    Core.LoaderMgr = LoaderMgr;
})(Core || (Core = {}));
//# sourceMappingURL=LoaderMgr.js.map