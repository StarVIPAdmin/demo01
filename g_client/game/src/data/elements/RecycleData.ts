module Data {

    /**
     * 回收点数据
     */
    export class RecycleData extends BaseData
    {
        // 位置索引
        public posIdx:number = 0;

        // 配置ID
        private _cfgId:number;

        init(cfgId:number):void 
        {
            this.cfgId = cfgId;
            this.collisionRadius = 250;
            this.width = 512;
            this.height = 512;
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