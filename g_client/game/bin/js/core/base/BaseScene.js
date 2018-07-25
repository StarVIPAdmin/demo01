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
     * 场景基类
     */
    var BaseScene = /** @class */ (function (_super) {
        __extends(BaseScene, _super);
        function BaseScene() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** 场景初始化 */
        BaseScene.prototype.onInit = function () { };
        /** 场景显示 */
        BaseScene.prototype.onShow = function () {
            this.pivot(0, 0);
            Core.LayerMgr.getInstance().addChildToScene(this);
        };
        /** 场景销毁 */
        BaseScene.prototype.onDestroy = function () {
            this.removeSelf();
        };
        return BaseScene;
    }(Laya.Sprite));
    Core.BaseScene = BaseScene;
})(Core || (Core = {}));
//# sourceMappingURL=BaseScene.js.map