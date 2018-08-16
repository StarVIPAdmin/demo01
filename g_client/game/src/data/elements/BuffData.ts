module Data {

    /**
     * 药剂buff数据
     */
    export class BuffData extends BaseData
    {
        init():void 
        {
            this.nick = "药剂"+this.id;
            this.bodyPath = Global.Path.PNG_BUFF_1;
            this.width = 512;
            this.height = 512;
            this.collisionRadius = 500;
            this.x = Math.random() * MAP_WIDTH;
            this.y = Math.random() * MAP_HEIGHT;
        }
    }
}