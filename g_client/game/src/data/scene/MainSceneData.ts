module Data {

    /**
     * 主场景数据
     */
    export class MainSceneData implements Core.IBaseSceneData
    {
        public sceneId:number;

        // 得分
        public score:number;

        /** 实现接口函数（进入场景调用） */
        onInit():void 
        {
            this.score = 0;
        }

        /** 实现接口函数（退出场景调用） */
        onClear():void 
        {
            this.score = 0;
        }
    }
}