module Data {

    /**
     * 药剂buff数据
     */
    export class BuffData extends BaseData
    {
        // 位置索引
        public posIdx:number = 0;

        // 配置ID
        private _cfgId:number;

        init(cfgId:number):void 
        {
            this.cfgId = cfgId;
            this.width = 512;
            this.height = 512;
            this.collisionRadius = 250;
        }

        get cfgId():number
        {
            return this._cfgId;
        }

        set cfgId(cfgId:number)
        {
            if (this._cfgId == cfgId) {
                return;
            }

            this._cfgId = cfgId;
            let cfg = ElementCfg.getBuffCfg(cfgId);
            this.nick = cfg.Name;
            this.bodyPath = Global.Path.BUFF_PATH + cfg.ResName + ".png";
        }
    }
}