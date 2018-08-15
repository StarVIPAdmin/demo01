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
            this.x = this.id * 2;
            this.y = this.id * 3;
        }
    }
}