module Game {
	/**
	 * 游戏启动类
	 */
	class Main extends Core.BaseSingleton
	{
		/** 获取单例实例 */
        static get instance():Main
        {
            return super.getInstanceOrCreate(Main);
        }

		// 执行
		run():void 
		{
			this.initRegister();
			Data.init();

			// 进入主场景
			sceneMgr.enterScene(Global.SceneId.MAIN_SCENE);
			viewMgr.showView(Global.ViewId.GAME_INFO_UI);
		}

		private initRegister():void 
		{
			this.initRegisterScene();
			this.initRegisterView();
		}

		/** 场景统一注册函数，游戏场景初始化前均要先注册 */
        private initRegisterScene():void 
        {
            sceneMgr.registerScene(Global.SceneId.MAIN_SCENE, MainScene, Data.MainSceneData);
        }

		/** UI界面统一注册函数，游戏UI界面初始化前均要先注册 */
        private initRegisterView():void 
        {
            viewMgr.registerView(Global.ViewId.GAME_INFO_UI, GameStartUI);
			viewMgr.registerView(Global.ViewId.GAME_OVER_UI, GameOverUI);
        }
	}

	export let main = Main.instance;
	export let sceneMgr = Core.SceneMgr.instance;
	export let viewMgr = Core.ViewMgr.instance;
	export let loaderMgr = Core.LoaderMgr.instance;
}