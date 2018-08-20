module Game {
    import PlayerData = Data.PlayerData;
    import FoodData = Data.FoodData;
    import BuffData = Data.BuffData;
    import RecycleData = Data.RecycleData;

    // require(".../data/config/element_cfg.json");

    /**
     * 游戏数据管理类
     */
    export class DataMgr extends Core.BaseSingleton
    {
        /** 获取单例实例 */
        static get instance():DataMgr
        {
            return super.getInstanceOrCreate(DataMgr);
        }

        isGameOver:boolean;
        roleData:PlayerData;
        enemyData:Array<PlayerData>;
        foodDataList:Array<FoodData>;
        buffDataList:Array<BuffData>;
        recycleDataList:Array<RecycleData>;

        /** 重写父类函数 */
        protected onCreate():void 
        {
            this.isGameOver = false;
            this.enemyData = [];
            this.foodDataList = [];
            this.buffDataList = [];
            this.recycleDataList = [];
        }

        /** 重写父类函数 */
        protected onDestroy():void
        {
            this.enemyData = null;
            this.foodDataList = null;
            this.buffDataList = null;
            this.recycleDataList = null;
        }

        /** 创建玩家数据 */
        createPlayerData(id:number):PlayerData
        {
            let data = new PlayerData(id);
            data.init();
            return data;
        }

        /** 创建食物数据 */
        createFoodData(id:number):FoodData
        {
            let data = new FoodData(id);
            data.init();
            return data;
        }

        /** 创建药剂BUFF数据 */
        createBuffData(id:number):BuffData
        {
            let data = new BuffData(id);
            data.init();
            return data;
        }

        /** 创建回收点数据 */
        createRecycleData(id:number):RecycleData
        {
            let data = new RecycleData(id);
            data.init();
            return data;
        }

        /** 获取玩家数据 */
        getPlayerData(id:number):PlayerData
        {
            if (this.roleData.id == id) {
                return this.roleData;
            } else {
                return this.enemyData[id];
            }
        }
        /** 获取食物数据 */
        getFoodData(id:number):FoodData
        {
            return this.foodDataList[id];
        }
        /** 获取buff数据 */
        getBuffData(id:number):BuffData
        {
            return this.buffDataList[id];
        }
        /** 获取回收点数据 */
        getRecycleData(id:number):RecycleData
        {
            return this.recycleDataList[id];
        }

        /** 删除指定唯一ID的buff数据 */
        removeBuffData(id:number):void 
        {
            this.buffDataList[id] = null;
        }

        /** 删除指定唯一ID的食物数据 */
        removeFoodData(id:number):void
        {
            this.foodDataList[id] = null;
        }

        // 测试初始化数据
        testInitData():void 
        {
            this.roleData = this.createPlayerData(1);
            this.roleData.x = Global.Const.GAME_WIDTH * 0.5;
            this.roleData.y = Global.Const.GAME_HEIGHT * 0.5;

            let id_buff = 10;
            let id_food = 100;
            let id_player = 50;
            let id_recycle = 80;

            let id
            for (var i = 0; i < 50; i++) {
                id = i + id_buff;
                this.buffDataList[id] = this.createBuffData(id);
            }

            for (var i = 0; i < 200; i++) {
                id = i + id_food;
                this.foodDataList[id] = this.createFoodData(id);
            }

            for (var i = 0; i < 30; i++) {
                id = i + id_recycle;
                this.recycleDataList[id] = this.createRecycleData(id);
            }

            for (var i = 0; i < 100; i++) {
                id = i + id_player;
                this.enemyData[id] = this.createPlayerData(id);
            }
        }

        /* 配置相关----------------------------------------------------------------------- */

        getBuffCfg(cfgId:number):any
        {
            let data = Laya.loader.getRes(Global.Path.JSON_ELEMENT_CFG);
            return data.BuffCfg[cfgId];
        }

        getFoodCfg(cfgId:number):any
        {
            let data = Laya.loader.getRes(Global.Path.JSON_ELEMENT_CFG);
            return data.FoodCfg[cfgId];
        }

        getRecycleCfg(cfgId:number):any
        {
            let data = Laya.loader.getRes(Global.Path.JSON_ELEMENT_CFG);
            return data.RecycleCfg[cfgId];
        }

        getSceneCfg(cfgId:number):any
        {
            let data = Laya.loader.getRes(Global.Path.JSON_SCENE_CFG);
            return data.SceneCfg[cfgId];
        }

        checkLevelByScore(score:number):number
        {
            let data = Laya.loader.getRes(Global.Path.JSON_SCORE_CFG);
            let scoreCfg = data.ScoreCfg;
            let len = scoreCfg.length;
            for (var i = 0; i < len; i++) {
                if (score < scoreCfg[i]) {
                    return i + 1;
                }
            }
            return len;
        }

        /* ------------------------------------------------------------------------------ */
    }
}