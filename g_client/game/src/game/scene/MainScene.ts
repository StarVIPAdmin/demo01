module Game {
    import Sprite = Laya.Sprite;
    import Text = Laya.Text;
    import Point = Laya.Point;
    import Event = Laya.Event;

    /**
     * 游戏场景
     */
    export class MainScene extends Core.BaseScene 
    {
        private _bgUI:BackgroundUI;
        private _mapFloor:MapFloor;
        private _player:Player;
        private _flyBar:ProgressBar;
        private _speedBar:ProgressBar;
        private _scoreTxt:Text;
        private _score:number;
        private _itemPoint:Point;
        private _npcTime:number;

        onInit():void 
        {
            super.onInit();
            this.sceneId = Global.SceneId.MAIN_SCENE;
            this._bgUI = null;
            this._mapFloor = null;
            this._flyBar = null;
            this._speedBar = null;
            this._scoreTxt = null;
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
            this._bgUI = new BackgroundUI();
            this.addChild(this._bgUI);

            this._mapFloor = new MapFloor();
            this.addChild(this._mapFloor);

            this._flyBar = new ProgressBar(Global.Const.BAR_TYPE_MP);
            this._flyBar.y = 7;
            this.addChild(this._flyBar);

            

            this._speedBar = new ProgressBar(Global.Const.BAR_TYPE_HP);
            this._speedBar.y = 7 + this._speedBar.height + 4;
            this.addChild(this._speedBar);

            this._player = new Player(this._flyBar, this._speedBar);
            this._player.x = 32 * 8;
            this._player.y = 32 * 4;
            this._player.on(Global.Const.PLAYER_STATE_DIE, this, this.playerDie);
            this.addChild(this._player);

            this._scoreTxt = new Text();
            this._scoreTxt.color = "#ffffff";
            this._scoreTxt.fontSize = 30;
            this._scoreTxt.text = "0";
            this._scoreTxt.width = Global.Const.GAME_WIDTH;
            this._scoreTxt.align = "right";
            this._scoreTxt.x = -10;
            this._scoreTxt.y = 10;
            this.addChild(this._scoreTxt);

            // this._npcTime = new Date().getTime();
            Laya.timer.frameLoop(1, this, this.onLoop);
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
                    this._bgUI.move(false);
                    this._mapFloor.moveMap(true);
                    break;
                case 68:    // D
                    this._bgUI.move(true);
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

        onLoop():void 
        {
            for (var i = this._mapFloor.numChildren - 1; i > -1; i--) {
                let floor = this._mapFloor.getChildAt(i) as Floor;
                if (floor.checkHit(this._player.x, this._player.y)) {
                    let itemList = floor.getItems();

                    for (var j = 0; j < itemList.length; j++) {
                        let item = itemList[j];
                        
                        if (item.visible) {
                            this._itemPoint.x = item.x + floor.x + this._player.width;
                            this._itemPoint.y = item.y + floor.y + this._player.height;

                            if (this._player.hitTestPoint(this._itemPoint.x, this._itemPoint.y)) {
                                if (item.type == Global.Const.ITEM_TYPE_SPEED) {
                                    item.visible = false;
                                    // this._player.showEffect();
                                } else if (item.type == Global.Const.ITEM_TYPE_FLY) {
                                    item.visible = false;
                                    this._flyBar.changeValue(100);
                                } else {
                                    Laya.Tween.to(item, {y:-10, scaleX:0.1, alpha:0}, 300, null, Laya.Handler.create(this, this.itemTweenComplete, [item]));
                                    this.updateScore();
                                }
                            }
                        }
                    }

                    this._player.y = floor.y;
                    this._player.jumpReset();
                }
            }

            let leftTime = new Date().getTime() - this._npcTime;
            if (leftTime > 1500) {
                this._npcTime = new Date().getTime();
                let npc = Laya.Pool.getItemByClass("npc", Npc);
                this.addChild(npc);
            }
        }

        itemTweenComplete(PItem:Food):void 
        {
            PItem.visible = false;
            PItem.y = 0;
            PItem.alpha = 1;
            PItem.scale(1, 1);
        }

        onMouseDown():void 
        {
            this._player.doubleJump();
        }

        onMouseUp():void 
        {
            this._player.gotoJump();
        }

        playerDie():void 
        {
            Data.isOver = true;
            viewMgr.showView(Global.ViewId.GAME_OVER_UI, this._score);
        }

        updateScore():void 
        {
            this._score++;
            this._scoreTxt.text = this._score.toString();
        }
    }
}