module Game {
    import Sprite = Laya.Sprite;

    // 玩家类标识（用于对象池回收）
    const ENEMY_CLASS_SIGN:string = "enemy";
    export const ROLE_CLASS_SIGN:string = "role";

    // 玩家属性类型
    export const PLAYER_ATTR_TYPE = {
        attack : "attack",
        walkSpeed : "walkSpeed"
    }

    /**
     * 玩家基类
     */
    class Player extends BaseElement 
    {   
        /** 重写父类函数 */
        init(id:number):void 
        {
            super.init(id);
        }

        /** 重写父类函数 */
        destroy():void 
        {
            super.destroy();
        }

        /** 从场景移除（返回对象池） */
        remove():void 
        {
        }
    }

    /**
     * 主角类
     */
    export class Role extends Player
    {
        // 体力增量
        private _powerDelta:number;

        get data():Data.PlayerData
        {
            return DataMgr.instance.roleData;
        }

        /** 重写父类函数 */
        init(id:number):void 
        {
            super.init(id);
            this._powerDelta = this.data.powerDelta;
            Laya.timer.loop(1000, this, this.onLoop);
        }

        /** 重写父类函数 */
        destroy():void 
        {
            super.destroy();
            Laya.timer.clearAll(this);
            Laya.Pool.recover(ROLE_CLASS_SIGN, this);
        }

        onLoop():void 
        {
            // 更新体力
            let newPower = this.data.curPower + this._powerDelta;
            this.data.curPower = newPower;
            if (this.data.totalPower != 0) {
                let percent = this.data.curPower / this.data.totalPower;
                this.event(Global.Event.ON_UPDATE_POWER, [percent]);
            }

            // 体力不足
            if (this.data.foodId != 0) {
                if (newPower <= 0) {
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
                    this._powerDelta = 0;
                    Laya.timer.clear(this, this.resetPowerDelta);
                    Laya.timer.once(param.Times * 100, this, this.resetPowerDelta);
                    break;
                case "SpeedUp":
                    // 速度提升
                    param = buffCfg.BuffParam;
                    oldValue = this.data.walkSpeed;
                    this.setWalkSpeedAttrValue(oldValue * (1 + param.UpVal/100));
                    Laya.timer.clear(this, this.setWalkSpeedAttrValue);
                    Laya.timer.once(param.Times * 100, this, this.setWalkSpeedAttrValue, [oldValue]);
                    break;
                case "AttackUp":
                    // 攻击提升
                    param = buffCfg.BuffParam;
                    oldValue = this.data.attack;
                    this.setAttackAttrValue(oldValue * (1 + param.UpVal/100));
                    Laya.timer.clear(this, this.setAttackAttrValue);
                    Laya.timer.once(param.Times * 100, this, this.setAttackAttrValue, [oldValue]);
                    break;
            }
        }

        /** 设置攻击属性 */
        setAttackAttrValue(attrValue:number):void 
        {
            this.data.attack = attrValue;
            this.event(Global.Event.CHANGE_PLAYER_ATTR, [PLAYER_ATTR_TYPE.attack, attrValue]);
        }

        /** 设置行走速度属性 */
        setWalkSpeedAttrValue(attrValue:number):void 
        {
            this.data.walkSpeed = attrValue;
            this.event(Global.Event.CHANGE_PLAYER_ATTR, [PLAYER_ATTR_TYPE.walkSpeed, attrValue]);
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

            this._powerDelta = this.data.powerDelta * 5;
            this.data.state = Data.PlayerState.PROTECT;
        }

        /** 离开回收点范围 */
        outRecycleArea():void 
        {
            this._powerDelta = this.data.powerDelta;
            this.data.state = Data.PlayerState.IDE;
        }

        /** 搬运食物 */
        onCarryFood(food:Food):void 
        {
            this.setFoodId(food.data.id);

            food.setCarryState();
            food.pos(0, 0);
            this.addChild(food);

            this._powerDelta = food.data.weight * -2;
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
            this._powerDelta = this.data.powerDelta;
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
    }

    /**
     * 敌人类
     */
    class Enemy extends Player
    {
        get data():Data.PlayerData
        {
            return DataMgr.instance.getPlayerData(this.id);
        }

        /** 重写父类函数 */
        init(id:number):void 
        {
            super.init(id);

            Laya.timer.frameLoop(1, this, this.onLoop);
        }

        /** 重写父类函数 */
        destroy():void 
        {
            super.destroy();
            Laya.timer.clearAll(this);
            Laya.Pool.recover(ENEMY_CLASS_SIGN, this);
        }

        onLoop():void 
        {
            let parent = this.parent as EnemyContainer;
            let isTouch = parent.mapContainer.checkPlayerCollision(this.x, this.y, this.data.collisionRadius);

            if (isTouch) {
                let roleAttack = DataMgr.instance.roleData.attack;
                
                if (roleAttack < this.data.attack) {
                    // 玩家阵亡
                    EventMgr.instance.event(Global.Event.GAME_OVER);
                } else if (roleAttack > this.data.attack) {
                    // 杀死敌人
                    // parent.removeEnemy(this.data.id);
                    this.setDeathState();
                }
            }
        }

        /** 设置死亡状态 */
        setDeathState():void 
        {
            this.data.state = Data.PlayerState.DEATH;
        }
    }

    /**
     * 敌人类容器
     */
    export class EnemyContainer extends Sprite
    {
        // 父容器
        private _mapContainer:MapContainer;
        // 敌人列表
        private _enemyList:Array<Enemy>;

        get mapContainer():MapContainer
        {
            return this._mapContainer;
        }

        init(parentContainer:MapContainer):void 
        {
            this._mapContainer = parentContainer;
            this._enemyList = [];
        }

        /** 创建敌人 */
        createEnemy(id:number):Enemy
        {
            let enemy:Enemy = Laya.Pool.getItemByClass(ENEMY_CLASS_SIGN, Enemy);
            enemy.init(id);
            return enemy;
        }

        /** 重置玩家 */
        resetEnemy():void 
        {
            // 清理旧数据
            this.clearEnemy();

            let dataList = DataMgr.instance.enemyData;
            if (dataList == null || dataList.length == 0) {
                return;
            }

            dataList.forEach(data => {
                let enemy = this.createEnemy(data.id);
                this.addChild(enemy);
                this._enemyList[data.id] = enemy;
            });
        }

        /** 根据唯一ID，增加指定玩家 */
        addEnemy(id:number):void 
        {
            if (this.checkEnemy(id)) {
                return;
            }

            let enemy = this.createEnemy(id);
            this.addChild(enemy);
            this._enemyList[id] = enemy;
        }

        /** 根据唯一ID，移除指定玩家 */
        removeEnemy(id:number):void 
        {
            if (!this.checkEnemy(id))
                return;

            let enemy = this._enemyList[id];
            enemy.destroy();
            this._enemyList[id] = null;
        }

        /** 清除玩家 */
        clearEnemy():void 
        {
            if (!this.checkEnemyList())
                return;

            this._enemyList.forEach(item => {
                item.destroy();
            });
            this._enemyList = [];
        }

        /** 检测玩家列表是否有数据 */
        checkEnemyList():boolean 
        {
            return !(this._enemyList == null || this._enemyList.length == 0)
        }

        /** 根据唯一ID，检测玩家是否存在 */
        checkEnemy(id:number):boolean 
        {
            if (!this.checkEnemyList()) {
                return false;
            }
            return this._enemyList[id] != null
        }
    }
}