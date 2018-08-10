module Data {
    // 主场景数据
    export let mainSceneData:MainSceneData;

    // 游戏是否结束
    export let isGameOver:boolean;

    // 初始化
    export function init():void 
    {
        isGameOver = false;
        mainSceneData = new MainSceneData();
    }
}