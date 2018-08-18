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

            this.collisionRadius = 250;
            this.width = 512;
            this.height = 512;
            this.x = Math.random() * Global.Const.MAP_WIDTH;
            this.y = Math.random() * Global.Const.MAP_HEIGHT;
        }
    }
}