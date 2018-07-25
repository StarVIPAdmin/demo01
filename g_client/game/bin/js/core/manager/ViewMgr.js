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
     * UI界面管理器
     */
    var ViewMgr = /** @class */ (function (_super) {
        __extends(ViewMgr, _super);
        function ViewMgr() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** 获取单例实例 */
        ViewMgr.getInstance = function () {
            return Core.BaseSingleton.getInstanceOrCreate(ViewMgr);
        };
        ViewMgr.prototype.onCreate = function () {
            this._viewCls = [];
            this._uiViews = [];
        };
        ViewMgr.prototype.onDestroy = function () {
        };
        /** 根据界面唯一ID，显示ui界面 */
        ViewMgr.prototype.showView = function (ViewId, Param) {
            var viewCls = this._viewCls[ViewId];
            if (viewCls == null) {
                console.log("[ViewMgr] showView : ViewCls is not register!!! ViewId = ", ViewId);
                return;
            }
            var view = this._uiViews[ViewId];
            if (view == null) {
                view = new viewCls();
                this._uiViews[ViewId] = view;
                if (view["onInit"]) {
                    view["onInit"]();
                }
            }
            if (view["onShow"]) {
                view["onShow"](Param);
            }
            Core.LayerMgr.getInstance().addChildToDialog(view);
            return view;
        };
        /** 根据界面唯一ID，隐藏ui界面 */
        ViewMgr.prototype.hideView = function (ViewId) {
            var view = this._uiViews[ViewId];
            if (view != null) {
                if (view["onHide"]) {
                    view["onHide"]();
                }
                if (view["onDestroy"]) {
                    view["onDestroy"]();
                }
                view.removeSelf();
                this._uiViews[ViewId] = null;
            }
        };
        /** 隐藏所以ui界面 */
        ViewMgr.prototype.hideAllView = function () {
            if (this._uiViews.length <= 0) {
                return;
            }
            for (var viewId in this._uiViews) {
                this.hideView(parseInt(viewId));
            }
            this._uiViews.length = 0;
        };
        /** 根据ID，获取已打开的界面 */
        ViewMgr.prototype.getView = function (ViewId) {
            var view = this._uiViews[ViewId];
            return view;
        };
        /** 检查ui界面是否已打开 */
        ViewMgr.prototype.checkViewIsOpen = function (ViewId) {
            var view = this._uiViews[ViewId];
            return view != null;
        };
        /** 注册UI界面 */
        ViewMgr.prototype.registerView = function (ViewId, ViewCls) {
            if (!ViewId || !ViewCls) {
                console.log("[ViewMgr] registerView : ViewId or ViewCls is null", ViewId, ViewCls);
                return;
            }
            if (this._viewCls[ViewId] != null) {
                console.log("[ViewMgr] registerView : ViewCls is exist, ViewId = ", ViewId);
                return;
            }
            this._viewCls[ViewId] = ViewCls;
        };
        return ViewMgr;
    }(Core.BaseSingleton));
    Core.ViewMgr = ViewMgr;
})(Core || (Core = {}));
//# sourceMappingURL=ViewMgr.js.map