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
     * 场景数据基类
     */
    var BaseSceneData = /** @class */ (function () {
        function BaseSceneData(SceneId) {
            this.sceneId = SceneId;
        }
        /** 初始化数据（进入场景调用） */
        BaseSceneData.prototype.onInit = function () { };
        /** 清除数据（退出场景调用） */
        BaseSceneData.prototype.onClear = function () {
            this.sceneId = null;
        };
        return BaseSceneData;
    }());
    Core.BaseSceneData = BaseSceneData;
    /**
     * 场景基类
     */
    var BaseScene = /** @class */ (function (_super) {
        __extends(BaseScene, _super);
        function BaseScene() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /** 场景数据类 */
            _this.__sceneData = null;
            return _this;
        }
        Object.defineProperty(BaseScene.prototype, "sceneData", {
            get: function () {
                return this.__sceneData;
            },
            enumerable: true,
            configurable: true
        });
        /** 场景初始化 */
        BaseScene.prototype.onInit = function () {
            if (this.sceneData != null)
                this.sceneData.onInit();
        };
        /** 场景显示 */
        BaseScene.prototype.onShow = function () {
            this.pivot(0, 0);
            Core.LayerMgr.instance.addChildToScene(this);
        };
        /** 场景销毁 */
        BaseScene.prototype.onDestroy = function () {
            if (this.sceneData != null)
                this.sceneData.onClear();
            this.removeSelf();
        };
        return BaseScene;
    }(Laya.Sprite));
    Core.BaseScene = BaseScene;
})(Core || (Core = {}));
//# sourceMappingURL=BaseScene.js.map