module Game {
    import PlayerData = Data.PlayerData;
    import FoodData = Data.FoodData;
    import BuffData = Data.BuffData;
    import RecycleData = Data.RecycleData;

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

        myPlayerData:PlayerData;

        otherPlayerData:Array<PlayerData>;

        foodDataList:Array<FoodData>;

        buffDataList:Array<BuffData>;

        recycleDataList:Array<RecycleData>;

        /** 重写父类函数 */
        protected onCreate():void 
        {
            this.isGameOver = false;
            this.otherPlayerData = [];
            this.foodDataList = [];
            this.buffDataList = [];
            this.recycleDataList = [];
        }

        /** 重写父类函数 */
        protected onDestroy():void
        {
            this.otherPlayerData = null;
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
            if (this.myPlayerData.id == id) {
                return this.myPlayerData;
            } else {
                return this.otherPlayerData[id];
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
            this.myPlayerData = this.createPlayerData(1);
            this.myPlayerData.x = Global.Const.GAME_WIDTH * 0.5;
            this.myPlayerData.y = Global.Const.GAME_HEIGHT * 0.5;

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
                this.otherPlayerData[id] = this.createPlayerData(id);
            }
        }
    }
}