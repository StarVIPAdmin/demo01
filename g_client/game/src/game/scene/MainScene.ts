module Game {
    import Sprite = Laya.Sprite;
    import Text = Laya.Text;
    import Point = Laya.Point;
    import Event = Laya.Event;

    /**
     * 游戏主场景
     */
    export class MainScene extends Core.BaseScene 
    {
        private _mainUI:GameMainUI;
        private _mapFloor:MapFloor;
        private _player:Player;
        // private _scoreTxt:Text;
        private _score:number;
        private _itemPoint:Point;
        private _npcTime:number;

        onInit():void 
        {
            super.onInit();
            this.sceneId = Global.SceneId.MAIN_SCENE;
            this._mainUI = null;
            this._mapFloor = null;
            this._score = 0;
            this._itemPoint = new Point();

            this.initUI();
            this.initEvent();
        }

        onShow():void 
        {
            super.onShow();
        }

        initUI():void 
        {
            this._mapFloor = new MapFloor();
            this.addChild(this._mapFloor);

            this._mainUI = new GameMainUI();
            this.addChild(this._mainUI);

            this._player = new Player();
            this._player.pos(0, 0);
            this._player.on(Global.Const.PLAYER_STATE_DIE, this, this.playerDie);
            this.addChild(this._player);

            // this._npcTime = new Date().getTime();
            // Laya.timer.frameLoop(1, this, this.onLoop);
        }

        initEvent():void 
        {
            Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onKeyDown);
            Laya.stage.on(Laya.Event.KEY_UP, this, this.onKeyUp);
        }

        onKeyDown(Evt:Event):void 
        {
            let keyCode:number = Evt.keyCode;

            switch (keyCode) {
                case 65:    // A
                    this._mapFloor.moveMap(true);
                    break;
                case 68:    // D
                    this._mapFloor.moveMap(false);
                    break;
                case 83:    // S
                    // this._bgUI.move();
                    break;
                case 87:    // W
                    // this._bgUI.move();
                    this._player.gotoJump();
                    break;
                default:
                    break;
            }
        }

        onKeyUp(Evt:Event):void 
        {

        }

        // onLoop():void 
        // {
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
        // }

        itemTweenComplete(PItem:Food):void 
        {
            PItem.visible = false;
            PItem.y = 0;
            PItem.alpha = 1;
            PItem.scale(1, 1);
        }

        onMouseDown():void 
        {
        }

        onMouseUp():void 
        {
            this._player.gotoJump();
        }

        playerDie():void 
        {
            Data.isGameOver = true;
            viewMgr.showView(Global.ViewId.GAME_OVER_UI, this._score);
        }

        updateScore():void 
        {
            this._score++;
            this._mainUI.refreshScoreTxt(this._score);
        }
    }
}