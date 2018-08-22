module Data {

    /**
     * 药剂buff数据
     */
    export class BuffData extends BaseData
    {
        // 配置ID
        private _cfgId:number;

        init():void 
        {
            this.cfgId = 1;

            this.width = 512;
            this.height = 512;
            this.collisionRadius = 250;
            this.x = Math.random() * Global.Const.MAP_WIDTH;
            this.y = Math.random() * Global.Const.MAP_HEIGHT;
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