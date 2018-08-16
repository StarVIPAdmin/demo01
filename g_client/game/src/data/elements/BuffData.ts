module Data {

    /**
     * 药剂buff数据
     */
    export class BuffData extends BaseData
    {
        // 配置ID
        public cfgId:number;

        init():void 
        {
            this.cfgId = 1;
            this.nick = "药剂"+this.id;
            this.bodyPath = Global.Path.PNG_BUFF_1;
            this.width = 512;
            this.height = 512;
            this.collisionRadius = 500;
            this.x = Math.random() * Global.Const.MAP_WIDTH;
            this.y = Math.random() * Global.Const.MAP_HEIGHT;
        }
    }
}