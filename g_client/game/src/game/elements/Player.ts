module Game {
    import Sprite = Laya.Sprite;

    export const ATTR_TYPE = {
        attack : "attack",
        walkSpeed : "walkSpeed"
    }

    // 玩家类标识（用于对象池回收）
    export const PLAYER_CLASS_SIGN:string = "player";

    /**
     * 玩家类
     */
    export class Player extends BaseElement 
    {   
        // 体力增量
        public powerDelta:number;

        get data():Data.PlayerData
        {
            return DataMgr.instance.getPlayerData(this.id);
        }

        /** 重写父类函数 */
        init(id:number):void 
        {
            super.init(id);
            this.powerDelta = this.data.powerDelta;

            // 定时器检测
            Laya.timer.loop(1000, this, this.onLoop);
        }

        /** 重写父类函数 */
        destroy():void 
        {
            super.destroy();
            Laya.timer.clearAll(this);
            Laya.Pool.recover(PLAYER_CLASS_SIGN, this);
        }

        onLoop():void 
        {
            // 更新玩家的体力
            let newVal = this.data.curPower + this.powerDelta;
            this.data.curPower = newVal;
            if (this.data.totalPower != 0) {
                let percent = this.data.curPower / this.data.totalPower;
                this.event(Global.Event.ON_UPDATE_POWER, [percent]);
            }

            // 体力不足
            if (this.data.foodId != 0) {
                if (newVal <= 0) {
                    this.event(Global.Event.RESET_FOOD, [this.data.foodId]);
                    this.setFoodId(0);
                    this.resetPowerDelta();
                }
            }
        }
        
        /** 获取一个buff */
        onGetBuff(cfgId:number):void 
        {
            let buffCfg = DataMgr.instance.getBuffCfg(cfgId);
            if (buffCfg == null) {
                return;
            }

            let param;
            let oldValue;
            switch (buffCfg.BuffEffect) {
                case "PowerUnChanged":
                    // 耐力不变
                    param = buffCfg.BuffParam;
                    this.powerDelta = 0;
                    Laya.timer.clear(this, this.resetPowerDelta);
                    Laya.timer.once(param.Times * 100, this, this.resetPowerDelta);
                    break;
                case "SpeedUp":
                    // 速度提升
                    param = buffCfg.BuffParam;
                    oldValue = this.data.walkSpeed;
                    this.setPlayerAttr(ATTR_TYPE.walkSpeed, oldValue * (1 + param.UpVal/100));
                    Laya.timer.clear(this, this.setPlayerAttr);
                    Laya.timer.once(param.Times * 100, this, this.setPlayerAttr, [ATTR_TYPE.walkSpeed, oldValue]);
                    break;
                case "AttackUp":
                    // 攻击提升
                    param = buffCfg.BuffParam;
                    oldValue = this.data.attack;
                    this.setPlayerAttr(ATTR_TYPE.attack, oldValue * (1 + param.UpVal/100));
                    Laya.timer.clear(this, this.setPlayerAttr);
                    Laya.timer.once(param.Times * 100, this, this.setPlayerAttr, [ATTR_TYPE.attack, oldValue]);
                    break;
            }
        }

        /** 设置玩家属性 */
        setPlayerAttr(attrType:string, attrValue:number):void
        {
            switch (attrType) {
                case ATTR_TYPE.attack:
                    this.data.attack = attrValue;
                    this.event(Global.Event.CHANGE_PLAYER_ATTR, ATTR_TYPE.attack);
                    break;
                case ATTR_TYPE.walkSpeed:
                    this.data.walkSpeed = attrValue;
                    this.event(Global.Event.CHANGE_PLAYER_ATTR, ATTR_TYPE.walkSpeed);
                    break;
            }
        }

        /** 处在回收点范围 */
        inRecycleArea():void 
        {
            // 回收食物
            if (this.data.foodId != 0) {
                let foodData = DataMgr.instance.getFoodData(this.data.foodId);
                this.addScore(foodData.score);
                this.event(Global.Event.RECYCLE_FOOD, [this.data.foodId]);
                this.setFoodId(0);
            }

            this.powerDelta = this.data.powerDelta * 5;
            this.data.state = Data.PlayerState.PROTECT;
        }

        /** 离开回收点范围 */
        outRecycleArea():void 
        {
            this.powerDelta = this.data.powerDelta;
            this.data.state = Data.PlayerState.IDE;
        }

        /** 搬运食物 */
        onCarryFood(food:Food):void 
        {
            this.setFoodId(food.data.id);

            food.setCarryState();
            food.pos(0, 0);
            this.addChild(food);

            this.powerDelta = food.data.weight * -2;
        }

        /** 设置玩家身上食物ID */
        setFoodId(foodId:number):void 
        {
            this.data.foodId = foodId;
            this.event(Global.Event.CHANGE_PLAYER_FOOD_ID, [foodId]);
        }

        /** 重置体力回复增量（自然增加值） */
        resetPowerDelta():void 
        {
            this.powerDelta = this.data.powerDelta;
        }

        /** 增加积分 */
        addScore(score:number):void 
        {
            let newScore = this.data.score + score;
            this.data.score = newScore;
            let newLvl = DataMgr.instance.checkLevelByScore(newScore);

            if (newLvl != this.data.level) {
                this.data.level = newLvl;
            }
        }

        /** 从场景移除（返回对象池） */
        remove():void 
        {
        }
    }

    /**
     * 玩家类容器
     */
    export class PlayerContainer extends Sprite
    {
        // 父容器
        private _mapContainer:MapContainer;
        // 玩家列表
        private _playerList:Array<Player>;

        init(parentContainer:MapContainer):void 
        {
            this._mapContainer = parentContainer;
            this._playerList = [];
        }

        /** 重置玩家 */
        resetPlayer():void 
        {
            // 清理旧数据
            this.clearPlayer();

            let dataList = DataMgr.instance.otherPlayerData;
            if (dataList == null || dataList.length == 0) {
                return;
            }

            dataList.forEach(data => {
                let player = ResMgr.instance.createPlayer(data.id);
                this.addChild(player);
                this._playerList[data.id] = player;
            });
        }

        /** 根据唯一ID，增加指定玩家 */
        addPlayer(id:number):void 
        {
            if (this.checkPlayer(id)) {
                return;
            }

            let player = ResMgr.instance.createPlayer(id);
            this.addChild(player);
            this._playerList[id] = player;
        }

        /** 根据唯一ID，移除指定玩家 */
        removePlayer(id:number):void 
        {
            if (!this.checkPlayer(id))
                return;

            let player = this._playerList[id];
            player.destroy();
            this._playerList[id] = null;
        }

        /** 清除玩家 */
        clearPlayer():void 
        {
            if (!this.checkPlayerList())
                return;

            this._playerList.forEach(item => {
                item.destroy();
            });
            this._playerList = [];
        }

        /** 检测玩家列表是否有数据 */
        checkPlayerList():boolean 
        {
            return !(this._playerList == null || this._playerList.length == 0)
        }

        /** 根据唯一ID，检测玩家是否存在 */
        checkPlayer(id:number):boolean 
        {
            if (!this.checkPlayerList()) {
                return false;
            }
            return this._playerList[id] != null
        }
    }
}