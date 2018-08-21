module Game {

    export class ConfigMgr extends Core.BaseSingleton
    {
        // 配置路径列表
        private _cfgPathList:Array<any>;

        /** 获取单例实例 */
        static get instance():ConfigMgr
        {
            return super.getInstanceOrCreate(ConfigMgr);
        }

        /** 重写父类函数 */
        protected onCreate():void 
        {
            let cfgPath = Global.Path.CFG_PATH;
            this._cfgPathList = [
                {"url":cfgPath + ElementCfg.name + ".json", "type":Laya.Loader.JSON},
                {"url":cfgPath + SceneCfg.name + ".json", "type":Laya.Loader.JSON},
                {"url":cfgPath + ScoreCfg.name + ".json", "type":Laya.Loader.JSON}
            ];
        }

        /** 重写父类函数 */
        protected onDestroy():void
        {
            this._cfgPathList = null;
        }

        get cfgPathList():Array<any>
        {
            return this._cfgPathList;
        }
    }
}