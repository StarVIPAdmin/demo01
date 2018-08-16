module Data {
    /**
     * 食物类型
     */
    export enum FoodType 
    {
        BOTANY = 1,     // 植物
        ANIMAL = 2      // 动物
    }

    /**
     * 食物数据类
     */
    export class FoodData extends BaseData
    {
        // 配置ID
        public cfgId:number;

        // 类型（默认是植物）
        public type:number = FoodType.BOTANY;

        // 重量
        public weight:number;

        // 攻击力
        public attack:number;

        init():void 
        {
            this.nick = "食物"+this.id;
            this.bodyPath = Global.Path.PNG_ITEM_1;
            this.weight = 10;
            this.cfgId = 1;

            this.collisionRadius = 120;
            this.width = 128;
            this.height = 128;
            this.x = Math.random() * Global.Const.MAP_WIDTH;
            this.y = Math.random() * Global.Const.MAP_HEIGHT;

            if (this.type == FoodType.BOTANY) {
                this.attack = 0;
            } else {
                this.attack = 10;
            }
        }
    }
}