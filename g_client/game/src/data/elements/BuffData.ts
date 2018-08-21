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
            this.nick = "药剂"+this.id;
            this.bodyPath = Global.Path.PNG_BUFF_1;
            this.width = 512;
            this.height = 512;
            this.collisionRadius = 250;
            this.x = Math.random() * Global.Const.MAP_WIDTH;
            this.y = Math.random() * Global.Const.MAP_HEIGHT;
        }

        set cfgId(cfgId:number)
        {
            this._cfgId = cfgId;

            let cfg = ElementCfg.getBuffCfg(cfgId);
            this.nick = cfg.Name;
            this.bodyPath = Global.Path.BUFF_PATH + cfg.ResName + ".png";
        }

        get cfgId():number
        {
            return this._cfgId;
        }
    }
}