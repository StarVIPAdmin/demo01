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
    export class FoodData 
    {
        // 唯一ID
        public Id:number;

        // 配置ID
        public cfgId:number;

        // 类型（默认是植物）
        public type:number = FoodType.BOTANY;

        // 重量
        public weight:number = 0;

        // 攻击力
        public attack:number = 0;
    }
}