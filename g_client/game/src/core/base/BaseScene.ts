module Core {

    /**
     * 场景数据基类接口
     */
    export interface IBaseSceneData
    {
        /** 场景ID */
        sceneId:number;
        /** 初始化数据 */
        onInit():void;
        /** 清除数据 */
        onClear():void;
    }

    /**
     * 场景基类接口
     */
    export interface IBaseScene 
    {
        /** 场景数据类 */
        sceneData:IBaseSceneData;
        /** 场景初始化 */
        onInit():void;
        /** 场景显示 */
        onShow():void;
        /** 场景销毁 */
        onDestroy():void;
    }

    /**
     * 场景基类
     */
    export class BaseScene extends Laya.Sprite implements IBaseScene
    {
        sceneData:IBaseSceneData = null;

        /** 场景初始化 */
        onInit():void 
        {
            if (this.sceneData != null) 
                this.sceneData.onInit();
        }

        /** 场景显示 */
        onShow():void 
        {
            this.pivot(0, 0);
            LayerMgr.getInstance().addChildToScene(this);
        }

        /** 场景销毁 */
        onDestroy():void 
        {
            if (this.sceneData != null) 
                this.sceneData.onClear();
            this.removeSelf();
        }
    }
}