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
     * 场景管理器
     */
    var SceneMgr = /** @class */ (function (_super) {
        __extends(SceneMgr, _super);
        function SceneMgr() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** 获取单例实例 */
        SceneMgr.getInstance = function () {
            return Core.BaseSingleton.getInstanceOrCreate(SceneMgr);
        };
        SceneMgr.prototype.onCreate = function () {
            this._sceneCls = [];
        };
        SceneMgr.prototype.onDestroy = function () {
        };
        SceneMgr.prototype.enterScene = function (SceneId) {
            var curSceneId;
            if (this._curScene) {
                curSceneId = this._curScene.sceneId;
            }
            if (curSceneId && curSceneId == SceneId) {
                return;
            }
            var sceneCls = this._sceneCls[SceneId];
            if (!sceneCls) {
                console.log("[SceneMgr] enterScene : SceneCls is not register, SceneId = " + SceneId);
                return;
            }
            if (this._curScene) {
                this._curScene.onDestroy();
                this._curScene = undefined;
            }
            var scene = new sceneCls();
            this._curScene = scene;
            scene.onInit();
            scene.onShow();
        };
        /** 根据场景ID，获取当前场景实例 */
        SceneMgr.prototype.getCurScene = function () {
            return this._curScene;
        };
        /** 注册场景 */
        SceneMgr.prototype.registerScene = function (SceneId, SceneCls) {
            if (!SceneId || !SceneCls) {
                console.log("[SceneMgr] registerScene : SceneId or SceneCls is null", SceneId, SceneCls);
                return;
            }
            if (this._sceneCls[SceneId] != null) {
                console.log("[SceneMgr] registerView : SceneCls is exist, SceneId = ", SceneId);
                return;
            }
            this._sceneCls[SceneId] = SceneCls;
        };
        return SceneMgr;
    }(Core.BaseSingleton));
    Core.SceneMgr = SceneMgr;
})(Core || (Core = {}));
//# sourceMappingURL=SceneMgr.js.map