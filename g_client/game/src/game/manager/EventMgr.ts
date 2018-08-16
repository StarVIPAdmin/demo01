module Game {
    
    /**
     * 事件管理器（派发，监听事件）
     */
    export class EventMgr extends Core.BaseSingleton
    {
        /** 获取单例实例 */
        static get instance():EventMgr
        {
            return super.getInstanceOrCreate(EventMgr);
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