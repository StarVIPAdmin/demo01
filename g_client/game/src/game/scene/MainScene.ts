module Game {
    import Sprite = Laya.Sprite;
    import Text = Laya.Text;
    import Point = Laya.Point;
    import Event = Laya.Event;

    import MainSceneData = Data.MainSceneData;

    /**
     * 游戏主场景
     */
    export class MainScene extends Core.BaseScene 
    {
        private _mainUI:GameMainUI;
        private _mapContainer:MapContainer;
        private _role:Role;

        /** 重写父类函数 */
        public get sceneData():MainSceneData
        {
            return this.__sceneData as MainSceneData;
        }

        /** 重写父类函数 */
        onInit(Params?:any):void 
        {
            super.onInit(Params);
            this._mainUI = null;
            this._mapContainer = null;
            this._role = null;
            this.initUI();
        }

        /** 重写父类函数 */
        onShow():void 
        {
            super.onShow();

            this._role = ResMgr.instance.createRole(DataMgr.instance.roleData.id);
            this.addChild(this._role);

            this._mapContainer.resetElements();

            this._mainUI.refreshAttackTxt(DataMgr.instance.roleData.attack);
            this._mainUI.refreshSpeedTxt(DataMgr.instance.roleData.walkSpeed);
            this._mainUI.refreshScoreTxt(DataMgr.instance.roleData.score);

            this.initEvent();

            // 场景定时器
            Laya.timer.frameLoop(1, this, this.onLoop);
        }

        /** 重写父类函数 */
        onDestroy():void 
        {
            super.onDestroy();
        }

        initUI():void 
        {
            this._mapContainer = new MapContainer();
            this._mapContainer.init(this.sceneData.mapPath);
            this.addChild(this._mapContainer);

            this._mainUI = new GameMainUI();
            this.addChild(this._mainUI);
        }

        initEvent():void 
        {
            Laya.stage.on(Event.MOUSE_DOWN, this, this.onMouseDown);
            Laya.stage.on(Event.MOUSE_UP, this, this.onMouseUp);
            Laya.stage.on(Event.MOUSE_MOVE, this, this.onMouseMove);
            // Laya.stage.on(Event.MOUSE_OUT, this, this.onMouseOut);

            this._role.on(Global.Event.ON_UPDATE_POWER, this, this.onUpdatePower);
            this._role.on(Global.Event.RECYCLE_FOOD, this, this.onRecycleFood);
            this._role.on(Global.Event.RESET_FOOD, this, this.onResetFood);
            this._role.on(Global.Event.CHANGE_PLAYER_FOOD_ID, this, this.onChangePlayerFoodId);
            this._role.on(Global.Event.CHANGE_PLAYER_ATTR, this, this.onChangePlayerAttr);

            EventMgr.instance.on(Global.Event.SET_CARRY_ICON_VISIBLE, this, this.onSetCarryIconVisible);
            EventMgr.instance.on(Global.Event.GET_BUFF, this, this.onGetBuff);
            EventMgr.instance.on(Global.Event.IN_RECYCLE_AREA, this, this.onRecycleArea);
            EventMgr.instance.on(Global.Event.GAME_OVER, this, this.onGameOver);
            EventMgr.instance.on(Global.Event.CARRY_FOOD, this, this.onCarryFood);
            EventMgr.instance.on(Global.Event.DROPOUT_FOOD, this, this.onDropoutFood);
        }

        onLoop():void 
        {
            this._mapContainer.moveMap(this._mainUI.getMoveIconAngle());
        //     let leftTime = new Date().getTime() - this._npcTime;
        }

        onMouseDown(evt:Event):void 
        {
            this._mainUI.onMouseDown(evt);
        }

        onMouseUp(evt:Event):void 
        {
            this._mainUI.onMouseUp(evt);
        }

        onMouseMove(evt:Event):void
        {
            this._mainUI.onMouseMove(evt);
        }

        /** 设置搬运图标是否显示 */
        onSetCarryIconVisible(foodId:number):void 
        {
            this._mainUI.setCarryIconVisible(foodId);
        }

        /** 获取一个buff */
        onGetBuff(buffCfgId:number):void 
        {
            this._role.onGetBuff(buffCfgId);
        }

        /** 是否处在回收点范围 */
        onRecycleArea(inRecycleArea:boolean):void 
        {
            if (inRecycleArea) {
                this._role.inRecycleArea();
            } else {
                this._role.outRecycleArea();
            }
        }

        /** 游戏结束 */
        onGameOver():void 
        {
            DataMgr.instance.isGameOver = true;
            viewMgr.showView(Global.ViewId.GAME_OVER_UI, DataMgr.instance.roleData.score);
        }

        /** 搬运食物 */
        onCarryFood(foodId:number):void 
        {
            let food = this._mapContainer.getFood(foodId);
            this._role.onCarryFood(food);
        }

        /** 丢弃食物 */
        onDropoutFood():void 
        {
            let foodId = DataMgr.instance.roleData.foodId;
            if (foodId != 0) {
                this._role.setFoodId(0);
                this._role.resetPowerDelta();
                this.onResetFood(foodId);
            }
        }

        /** 更新玩家体力 */
        onUpdatePower(percent:number):void 
        {
            this._mainUI.refreshPlayerPower(percent);
        }

        /** 回收食物 */
        onRecycleFood(foodId:number):void 
        {
            this._mapContainer.foodContainer.removeFood(foodId);
            this._mainUI.refreshScoreTxt(this._role.data.score);
        }

        /** 还原食物 */
        onResetFood(foodId:number):void 
        {
            this._mapContainer.foodContainer.dropoutFood(foodId);
        }

        /** 改变玩家食物ID */
        onChangePlayerFoodId(foodId:number):void 
        {
            this._mainUI.setDropoutIconVisible(foodId != 0);
        }

        /** 改变玩家属性 */
        onChangePlayerAttr(attrType:string, attrValue:number):void 
        {
            switch (attrType) {
                case PLAYER_ATTR_TYPE.attack:
                    this._mainUI.refreshAttackTxt(attrValue);
                    break;
                case PLAYER_ATTR_TYPE.walkSpeed:
                    this._mainUI.refreshSpeedTxt(attrValue);
                    break;
            }
        }
    }
}