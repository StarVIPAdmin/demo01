module Data {
    // 游戏是否结束
    export let isGameOver:boolean;

    export let myPlayerData:PlayerData;

    export let playerDataList:Array<PlayerData>;

    // 初始化
    export function init():void 
    {
        isGameOver = false;
        playerDataList = [];

        myPlayerData = new PlayerData(1);
    }
}