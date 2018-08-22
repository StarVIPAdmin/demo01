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
        private _buffPos:Array<Object>;
        // 食物坐标
        private _foodPos:Array<Object>;
        // 洞穴坐标
        private _recyclePos:Array<Object>;

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
            this._cfgId = cfgId;

            let sceneCfg = SceneCfg.getSceneCfg(cfgId);
            this._mapPath = Global.Path.MAP_PATH + sceneCfg.MapName + ".jpg";
            this._buffPos = sceneCfg.BuffPos;
            this._foodPos = sceneCfg.FoodPos;
            this._recyclePos = sceneCfg.RecyclePos;
        }

        get mapPath():string
        {
            return this._mapPath;
        }

        getBuffPos():Object
        {
            let result:Array<Object> = [];
            this._buffPos.forEach(pos => {
                if (!pos.hasOwnProperty("isUse")) {
                    result.push(pos);
                }
            });

            

            return {};
        }

        getFoodPos():Object
        {
            return {};
        }

        getRecyclePos():Object
        {
            return {};
        }
    }
}