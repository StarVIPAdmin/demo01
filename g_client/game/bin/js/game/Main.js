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
     * 游戏启动类
     */
    var Main = /** @class */ (function (_super) {
        __extends(Main, _super);
        function Main() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** 获取单例实例 */
        Main.getInstance = function () {
            return Core.BaseSingleton.getInstanceOrCreate(Main);
        };
        // 执行
        Main.prototype.run = function () {
            this.init();
            // 进入主场景
            Game.sceneMgr.enterScene(Global.SceneId.MAIN_SCENE);
            Game.viewMgr.showView(Global.ViewId.GAME_INFO_UI);
        };
        Main.prototype.init = function () {
            this.initRegisterScene();
            this.initRegisterView();
        };
        /** 场景统一注册函数，游戏场景初始化前均要先注册 */
        Main.prototype.initRegisterScene = function () {
            Game.sceneMgr.registerScene(Global.SceneId.MAIN_SCENE, Game.MainScene);
        };
        /** UI界面统一注册函数，游戏UI界面初始化前均要先注册 */
        Main.prototype.initRegisterView = function () {
            Game.viewMgr.registerView(Global.ViewId.GAME_INFO_UI, Game.GameInfoUI);
            Game.viewMgr.registerView(Global.ViewId.GAME_OVER_UI, Game.GameOverUI);
        };
        return Main;
    }(Core.BaseSingleton));
    Game.main = Main.getInstance();
    Game.sceneMgr = Core.SceneMgr.getInstance();
    Game.viewMgr = Core.ViewMgr.getInstance();
    Game.loaderMgr = Core.LoaderMgr.getInstance();
})(Game || (Game = {}));
//# sourceMappingURL=Main.js.map