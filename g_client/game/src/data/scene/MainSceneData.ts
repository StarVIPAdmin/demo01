module Data {

    /**
     * 主场景数据
     */
    export class MainSceneData extends Core.BaseSceneData
    {
        // 配置ID
        private _cfgId:number;
        // 地图路径
        private _mapPath:string;
        // 药剂坐标
        private _buffPos:Array<any>;
        // 食物坐标
        private _foodPos:Array<any>;
        // 洞穴坐标
        private _recyclePos:Array<any>;

        /** 重写父类函数 */
        onInit(Params?:any):void 
        {
            super.onInit();
            this._buffPos = [];
            this._foodPos = [];
            this._recyclePos = [];
            this.cfgId = Params;
        }

        /** 重写父类函数 */
        onClear():void 
        {
            super.onClear();
        }

        set cfgId(cfgId:number)
        {
            if (this._cfgId == cfgId) {
                return;
            }
            let sceneCfg = SceneCfg.getSceneCfg(cfgId);
            this._cfgId = cfgId;
            this._mapPath = Global.Path.MAP_PATH + sceneCfg.MapName + ".jpg";
            this._buffPos = sceneCfg.BuffPos;
            this._foodPos = sceneCfg.FoodPos;
            this._recyclePos = sceneCfg.RecyclePos;
        }

        get mapPath():string
        {
            return this._mapPath;
        }

        /** 根据索引获取buff药剂坐标 */
        getBuffPosByIdx(idx:number):any
        {
            return this._buffPos[idx] || {"x":0, "y":0};
        }

        /** 根据索引获取食物坐标 */
        getFoodPosByIdx(idx:number):any
        {
            return this._foodPos[idx] || {"x":0, "y":0}
        }

        /** 根据索引获取洞穴坐标 */
        getRecyclePosByIdx(idx:number):any
        {
            return this._recyclePos[idx] || {"x":0, "y":0}
        }
    }
}