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

            for (var i = 0; i < 5; i++) {
                this.buffDataList[i] = this.createBuffData(i + id_buff);
            }

            for (var i = 0; i < 20; i++) {
                this.foodDataList[i] = this.createFoodData(i + id_food);
            }

            for (var i = 0; i < 3; i++) {
                this.recycleDataList[i] = this.createRecycleData(i + id_recycle);
            }

            for (var i = 0; i < 10; i++) {
                this.otherPlayerData[i] = this.createPlayerData(i + id_player);
            }
        }
    }
}