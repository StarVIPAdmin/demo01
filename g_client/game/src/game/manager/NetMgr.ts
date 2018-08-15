module Game {

    /**
     * 网络协议管理类
     */
    export class NetMgr extends Core.BaseSingleton
    {
        /** 获取单例实例 */
        static get instance():NetMgr
        {
            return super.getInstanceOrCreate(NetMgr);
        }

        /** 重写父类函数 */
        protected onCreate():void 
        {
        }

        /** 重写父类函数 */
        protected onDestroy():void
        {
        }
    }
}