module Data {

    /**
     * 主场景数据
     */
    export class MainSceneData extends Core.BaseSceneData
    {
        // 得分
        public score:number;

        /** 重写父类函数 */
        onInit():void 
        {
            super.onInit();
            this.score = 0;
        }

        /** 重写父类函数 */
        onClear():void 
        {
            super.onClear();
            this.score = 0;
        }
    }
}