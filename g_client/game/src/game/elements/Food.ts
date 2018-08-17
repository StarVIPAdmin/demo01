module Game {
    import Sprite = Laya.Sprite;

    // food类标识（用于对象池回收）
    const FOOD_CLASS_SIGN:string = "food";

    /**
     * 食物类
     */
    export class Food extends BaseElement
    {
        // 是否在锁定状态（true 有玩家碰撞 false 没玩家碰撞）
        private _isLock:boolean;

        get data():Data.FoodData
        {
            return DataMgr.instance.getFoodData(this.id);
        }

        /** 重写父类函数 */
        init(id:number):void 
        {
            super.init(id);
            this._isLock = false;

            // 定时器检测
            Laya.timer.frameLoop(1, this, this.onLoop);
        }

        /** 重写父类函数 */
        destroy():void 
        {
            super.destroy();
            Laya.timer.clear(this, this.onLoop);
            Laya.Pool.recover(FOOD_CLASS_SIGN, this);
        }

        setCarryState():void 
        {
            this.data.state = Data.FoodState.CARRY;
            Laya.timer.clear(this, this.onLoop);
            this._isLock = false;
            EventMgr.instance.event(Global.Event.SET_CARRY_ICON_VISIBLE, [0]);
            this.removeSelf();
        }

        onLoop():void 
        {
            let parent = this.parent as FoodContainer;
            let isTouch = parent.mapContainer.checkPlayerCollision(this.x, this.y, this.data.collisionRadius);

            if (isTouch) 
            {
                this._isLock = true;

                switch (this.data.state) {
                    case Data.FoodState.LIVE:
                        this.checkFoodType();
                        break;
                    case Data.FoodState.DEATH:
                        EventMgr.instance.event(Global.Event.SET_CARRY_ICON_VISIBLE, [this.data.id]);
                        break;
                    case Data.FoodState.CARRY:
                        break;
                }
            } else if (this._isLock) {
                this._isLock = false;
                EventMgr.instance.event(Global.Event.SET_CARRY_ICON_VISIBLE, [0]);
            }
        }

        checkFoodType():void
        {
            switch (this.data.type) {
                case Data.FoodType.BOTANY:
                    // 植物
                    EventMgr.instance.event(Global.Event.SET_CARRY_ICON_VISIBLE, [this.data.id]);
                    break;
                case Data.FoodType.ANIMAL:
                    // 动物
                    if (this.data.attack > DataMgr.instance.myPlayerData.attack) {
                        // 玩家死亡
                        EventMgr.instance.event(Global.Event.GAME_OVER);
                    } else {
                        // 杀死动物
                        this.data.state = Data.FoodState.DEATH;
                        EventMgr.instance.event(Global.Event.SET_CARRY_ICON_VISIBLE, [this.data.id]);
                    }
                    break;
            }
        }
    }

    /**
     * 食物类容器
     */
    export class FoodContainer extends Sprite
    {
        // 父容器
        private _mapContainer:MapContainer;
        // 食物列表
        private _foodList:Array<Food>;

        get mapContainer():MapContainer
        {
            return this._mapContainer;
        }

        init(parentContainer:MapContainer):void
        {
            this._mapContainer = parentContainer;
            this._foodList = [];
        }

        /** 创建食物 */
        createFood(id:number):Food
        {
            let food:Food = Laya.Pool.getItemByClass(FOOD_CLASS_SIGN, Food);
            food.init(id);
            return food;
        }

        /** 重置食物 */
        resetFood():void 
        {
            // 清理旧数据
            this.clearFood();

            let dataList = DataMgr.instance.foodDataList;
            if (dataList == null || dataList.length == 0) {
                return;
            }

            dataList.forEach(data => {
                let food = this.createFood(data.id);
                this.addChild(food);
                this._foodList[data.id] = food;
            });
        }

        /** 根据唯一ID，增加指定食物 */
        addFood(id:number):void 
        {
            if (this.checkFood(id)) {
                return;
            }

            let food = this.createFood(id);
            this.addChild(food);
            this._foodList[id] = food;
        }

        /** 根据唯一ID，移除指定食物 */
        removeFood(id:number):void 
        {
            if (!this.checkFood(id)) 
                return;

            let food = this._foodList[id];
            food.destroy();
            this._foodList[id] = null;
        }

        /** 清除食物 */
        clearFood():void 
        {
            if (!this.checkFoodList()) {
                return;
            }

            this._foodList.forEach(item => {
                item.destroy();
            });
            this._foodList = [];
        }

        /** 获取场景食物 */
        getFood(id:number):Food
        {
            return this._foodList[id];
        }

        /** 检测食物列表是否有数据 */
        checkFoodList():boolean 
        {
            return !(this._foodList == null || this._foodList.length == 0)
        }

        /** 根据唯一ID，检测食物是否存在 */
        checkFood(id:number):boolean
        {
            if (!this.checkFoodList()) {
                return false;
            }
            return this._foodList[id] != null;
        }
    }
}