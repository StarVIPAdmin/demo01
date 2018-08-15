module Data {

    /**
     * 回收点数据
     */
    export class RecycleData extends BaseData
    {
        init():void 
        {
            this.nick = "食物回收"+this.id;
            this.bodyPath = Global.Path.PNG_FOOD_RECYCLE_1;

            this.width = 512;
            this.height = 512;
            this.x = this.id * 2;
            this.y = this.id * 3;
        }
    }
}