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
        private _playerContainer:PlayerContainer;

        /** 重写父类函数 */
        public get sceneData():MainSceneData
        {
            return this.__sceneData as MainSceneData;
        }

        /** 重写父类函数 */
        onInit():void 
        {
            super.onInit();
            this._mainUI = null;
            this._mapContainer = null;
            this._playerContainer = null;

            this.initUI();
            this.initEvent();
        }

        /** 重写父类函数 */
        onShow():void 
        {
            super.onShow();

            this._playerContainer.createMyPlayer();
            this._playerContainer.addPlayer();

            this._mapContainer.show();

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
            this._mapContainer.init();
            this.addChild(this._mapContainer);

            this._playerContainer = new PlayerContainer();
            this._playerContainer.init();
            this.addChild(this._playerContainer);

            this._mainUI = new GameMainUI();
            this.addChild(this._mainUI);
        }

        initEvent():void 
        {
            Laya.stage.on(Event.MOUSE_DOWN, this, this.onMouseDown);
            Laya.stage.on(Event.MOUSE_UP, this, this.onMouseUp);
            Laya.stage.on(Event.MOUSE_MOVE, this, this.onMouseMove);
            Laya.stage.on(Event.MOUSE_OUT, this, this.onMouseOut);
        }

        onLoop():void 
        {
            this._mapContainer.moveMap(this._mainUI.getMoveIconAngle());
            
        //     for (var i = this._mapFloor.numChildren - 1; i > -1; i--) {
        //         let floor = this._mapFloor.getChildAt(i) as Floor;
        //         if (floor.checkHit(this._player.x, this._player.y)) {
        //             let itemList = floor.getItems();

        //             for (var j = 0; j < itemList.length; j++) {
        //                 let item = itemList[j];
                        
        //                 if (item.visible) {
        //                     this._itemPoint.x = item.x + floor.x + this._player.width;
        //                     this._itemPoint.y = item.y + floor.y + this._player.height;

        //                     if (this._player.hitTestPoint(this._itemPoint.x, this._itemPoint.y)) {
        //                         if (item.type == Global.Const.ITEM_TYPE_SPEED) {
        //                             item.visible = false;
        //                             // this._player.showEffect();
        //                         } else if (item.type == Global.Const.ITEM_TYPE_FLY) {
        //                             item.visible = false;
        //                             this._flyBar.changeValue(100);
        //                         } else {
        //                             Laya.Tween.to(item, {y:-10, scaleX:0.1, alpha:0}, 300, null, Laya.Handler.create(this, this.itemTweenComplete, [item]));
        //                             this.updateScore();
        //                         }
        //                     }
        //                 }
        //             }

        //             this._player.y = floor.y;
        //         }
        //     }

        //     let leftTime = new Date().getTime() - this._npcTime;
        //     if (leftTime > 1500) {
        //         this._npcTime = new Date().getTime();
        //         let npc = Laya.Pool.getItemByClass("npc", Npc);
        //         this.addChild(npc);
        //     }
        }

        // itemTweenComplete(PItem:Food):void 
        // {
        //     PItem.visible = false;
        //     PItem.y = 0;
        //     PItem.alpha = 1;
        //     PItem.scale(1, 1);
        // }

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

        onMouseOut(evt:Event):void 
        {
            // this._mainUI.onMouseUp(evt);
        }

        playerDie():void 
        {
            
            Data.isGameOver = true;
            viewMgr.showView(Global.ViewId.GAME_OVER_UI, this.sceneData.score);
        }

        updateScore():void 
        {
            this.sceneData.score++;
            this._mainUI.refreshScoreTxt(this.sceneData.score);
        }
    }
}