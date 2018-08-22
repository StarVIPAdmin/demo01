module Data {

    /**
     * 回收点数据
     */
    export class RecycleData extends BaseData
    {
        // 配置ID
        private _cfgId:number;

        init():void 
        {
            this.cfgId = 1;

            this.collisionRadius = 250;
            this.width = 512;
            this.height = 512;
            this.x = Math.random() * Global.Const.MAP_WIDTH;
            this.y = Math.random() * Global.Const.MAP_HEIGHT;
        }

        get cfgId():number
        {
            return this._cfgId;
        }

        set cfgId(cfgId:number)
        {
            this._cfgId = cfgId;
            let cfg = ElementCfg.getRecycleCfg(cfgId);
            this.nick = cfg.Name;
            this.bodyPath = Global.Path.RECYCLE_PATH + cfg.ResName + ".png";
        }
    }
}