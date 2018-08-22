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
        /** 场景初始化 */
        onInit():void;
        /** 场景显示 */
        onShow():void;
        /** 场景销毁 */
        onDestroy():void;
    }

    /**
     * 场景数据基类
     */
    export class BaseSceneData implements IBaseSceneData
    {
        /** 场景ID */
        sceneId:number;

        constructor(SceneId:number) 
        {
            this.sceneId = SceneId;
        }

        /** 初始化数据（进入场景调用） */
        onInit(Params?:any):void {}
        
        /** 清除数据（退出场景调用） */
        onClear():void 
        {
            this.sceneId = null;
        }
    }

    /**
     * 场景基类
     */
    export class BaseScene extends Laya.Sprite implements IBaseScene
    {
        /** 场景数据类 */
        __sceneData:BaseSceneData = null;
        public get sceneData():BaseSceneData
        {
            return this.__sceneData;
        }

        /** 场景初始化 */
        onInit(Params?:any):void 
        {
            if (this.sceneData != null) 
                this.sceneData.onInit(Params);
        }

        /** 场景显示 */
        onShow():void 
        {
            this.pivot(0, 0);
            LayerMgr.instance.addChildToScene(this);
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