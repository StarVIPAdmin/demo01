module Game {

    /**
     * 配置管理
     */
    export class ConfigMgr extends Core.BaseSingleton
    {
        /** 获取单例实例 */
        static get instance():ConfigMgr
        {
            return super.getInstanceOrCreate(ConfigMgr);
        }

        /** 重写父类函数 */
        protected onCreate():void 
        {
        }

        /** 重写父类函数 */
        protected onDestroy():void
        {
        }

        /** 初始化配置 */
        initConfig():void 
        {
            ElementCfg.onInit(ElementCfg.path);
            SceneCfg.onInit(SceneCfg.path);
            ScoreCfg.onInit(ScoreCfg.path);
        }
    }
}