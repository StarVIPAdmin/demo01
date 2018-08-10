module Core {
    /**
     * 场景管理器
     */
    export class SceneMgr extends BaseSingleton
    {
        /** 获取单例实例 */
        public static getInstance():SceneMgr
        {
            return BaseSingleton.getInstanceOrCreate(SceneMgr);
        }

        // 游戏场景类集
        private _sceneCls:Array<any>;
        // 场景数据类集（默认是BaseSceneData）
        private _sceneData:Array<any>;
        // 当前处在的场景
        private _curScene:BaseScene;

        protected onCreate():void
        {
            this._sceneCls = [];
        }

        protected onDestroy():void
        {
        }

        enterScene(SceneId:number):void 
        {
            let curSceneId:number;
            if (this._curScene) {
                curSceneId = this._curScene.sceneData.sceneId;
            }

            if (curSceneId && curSceneId == SceneId) {
                return;
            }

            let sceneCls = this._sceneCls[SceneId];
            if (!sceneCls) {
                console.log("[SceneMgr] enterScene : SceneCls is not register, SceneId = " + SceneId);
                return;
            }

            let sceneDataCls = this._sceneData[SceneId];
            if (!sceneDataCls) {
                console.log("[SceneMgr] enterScene : SceneDataCls is not exist, SceneId = " + SceneId);
                return;
            }

            if (this._curScene) {
                this._curScene.onDestroy();
                this._curScene = undefined;
            }

            let sceneData:BaseSceneData = new sceneDataCls(SceneId);
            let scene:BaseScene = new sceneCls();
            scene.sceneData = sceneData;
            scene.onInit();
            scene.onShow();
            this._curScene = scene;
        }

        /** 根据场景ID，获取当前场景实例 */
        getCurScene():BaseScene
        {
            return this._curScene
        }

        /** 注册场景 */
        registerScene(SceneId:number, SceneCls:any, SceneData:any=null):void 
        {
            if (!SceneId || !SceneCls) {
                console.log("[SceneMgr] registerScene : SceneId or SceneCls is null", SceneId, SceneCls);
                return;
            }
            if (this._sceneCls[SceneId] != null) {
                console.log("[SceneMgr] registerView : SceneCls is exist, SceneId = ", SceneId);
                return;
            }
            this._sceneCls[SceneId] = SceneCls;
            this._sceneData[SceneId] = SceneData || BaseSceneData;
        }
    }
}