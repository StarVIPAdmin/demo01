module Data {
    // 游戏是否结束
    export let isGameOver:boolean;

    export let playerData:PlayerData;
    
    // 初始化
    export function init():void 
    {
        isGameOver = false;
        playerData = new PlayerData();
    }
}