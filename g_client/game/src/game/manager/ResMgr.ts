module Game {
    import Text = Laya.Text;

    /**
     * 资源管理类
     */
    export class ResMgr extends Core.BaseSingleton
    {
        /** 获取单例实例 */
        public static getInstance():ResMgr
        {
            return Core.BaseSingleton.getInstanceOrCreate(ResMgr);
        }

        /** 重写父类函数 */
        protected onCreate():void 
        {
        }

        /** 重写父类函数 */
        protected onDestroy():void
        {
        }

        createText():Text
        {
            let txt = new Text();
            txt.fontSize = 20;
            txt.color = "#ffffff";
            txt.text = "";
            txt.align = "left";
            txt.pos(0, 0);
            txt.size(100, 100);
            return txt;
        }
    }
}