module Data {
    // 游戏是否结束
    export let isGameOver:boolean;

    // 玩家数据
    export let myPlayerData:PlayerData;

    // 其他玩家数据列表（以玩家唯一ID索引）
    export let playerDataList:Array<PlayerData>;

    // 食物数据列表（以唯一ID索引）
    export let foodDataList:Array<FoodData>;

    // 药剂buff数据列表（以唯一ID索引）
    export let buffDataList:Array<BuffData>;

    // 回收点数据列表（以唯一ID索引）
    export let recycleDataList:Array<RecycleData>;

    // 初始化
    export function init():void 
    {
        isGameOver = false;

        playerDataList = [];
        foodDataList = [];
        buffDataList = [];
        recycleDataList = [];

        myPlayerData = new PlayerData(1);
        myPlayerData.init();
    }
}