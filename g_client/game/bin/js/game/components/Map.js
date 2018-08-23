var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game;
(function (Game) {
    var Sprite = Laya.Sprite;
    /**
     * 地板类
     */
    // class Floor extends Sprite 
    // {
    //     private _bgTexture:any;
    //     private _maxRight:number;
    //     private _isOutComplete:boolean;
    //     private _bg:Sprite;
    //     private _rightBg:Sprite;
    //     private _itemList:Array<Food>;
    //     constructor() 
    //     {
    //         super();
    //         this._bgTexture = null;
    //         this._maxRight = 0;
    //         this._isOutComplete = false;
    //         this._bg = null;
    //         this._rightBg = null;
    //         this._itemList = [];
    //     }
    //     init(floorType:number):void 
    //     {
    //         let needItem = true;
    //         this.autoSize = true;
    //         this._maxRight = 0;
    //         this.x = Global.Const.GAME_WIDTH;
    //         this.y = 32 * 6 + 32 * 8 * Math.random();
    //         if (this._bg == null) {
    //             this._bgTexture = Laya.loader.getRes(Global.Path.PNG_BUFF_1);
    //             this._bg = new Sprite();
    //             this._bg.graphics.clear();
    //             this.addChild(this._bg);
    //             this._rightBg = new Sprite();
    //             this._rightBg.graphics.drawTexture(Laya.Texture.createFromTexture(this._bgTexture, 32*29,0,32,96), 0, 0, 32, 96);
    //             this._rightBg.width = 32;
    //             this.addChild(this._rightBg);
    //         }
    //         switch (floorType) {
    //             case 1:
    //                 this._rightBg.visible = false;
    //                 this._bg.graphics.drawTexture(this._bgTexture, 0, 0, 960, 96);
    //                 needItem = false;
    //                 break;
    //             default:
    //                 let w = 32 * (3 + 19 * Math.random());
    //                 this._bg.graphics.clear();
    //                 this._bg.graphics.drawTexture(Laya.Texture.createFromTexture(this._bgTexture, 0, 0, w, 96), 0, 0, w, 96);
    //                 this._rightBg.visible = true;
    //                 this._rightBg.x = w;
    //                 break;
    //         }
    //         this._maxRight = Global.Const.GAME_WIDTH - 32 * 2 - 32 * 10 * Math.random();
    //         if (needItem) {
    //             this.addItem();
    //         }
    //     }
    //     addItem():void 
    //     {
    //         let m = Math.random() * 10;
    //         if (m < 5) return;
    //         let addNum = 0;
    //         let maxNum = this.width / 32;
    //         if (maxNum > 5) {
    //             addNum = 5 + (maxNum - 5) * Math.random();
    //         } else {
    //             addNum = maxNum;
    //         }
    //         let sx = (this.width - addNum * 32) * 0.5;
    //         let arr = [];
    //         let randNum;
    //         let specialItem = false;
    //         let item;
    //         for (var i = 0; i < addNum; i++) {
    //             if (i % 2 == 0) continue;
    //             randNum = Math.random();
    //             if (this._itemList.length > 0) {
    //                 item = this._itemList.shift();
    //                 item.visible = true;
    //             } else {
    //                 item = Laya.Pool.getItemByClass("item", Food);
    //             }
    //             if (randNum > 0.95 && !specialItem) {
    //                 specialItem = true;
    //                 item.init(Global.Const.ITEM_TYPE_SPEED);
    //             } else if (randNum > 0.9 && !specialItem) {
    //                 specialItem = true;
    //                 item.init(Global.Const.ITEM_TYPE_FLY);
    //             } else {
    //                 item.init(Global.Const.ITEM_TYPE_STAR);
    //             }
    //             item.x = sx + i * 32;
    //             item.y = -30;
    //             this.addChild(item);
    //             arr.push(item);
    //         }
    //         this._itemList = [].concat(arr);
    //     }
    //     getItems():Array<Food> 
    //     {
    //         return this._itemList;
    //     }
    //     /**
    //      * 移动
    //      * @param Dir 方向 1 →移动， -1←移动
    //      */
    //     move(Dir:number):void 
    //     {
    //         if (Data.isGameOver) return;
    //         this.x += Dir * 0.2 * 1.2;
    //         if (!this._isOutComplete && (this.x + this.width) < this._maxRight) {
    //             this._isOutComplete = true;
    //             this.event(Global.Event.FLOOR_OUT_COMPLETE, this);
    //         } else if ((this.x + this.width) < 0) {
    //             for (var i = 0; i < this._itemList.length; i++) {
    //                 this._itemList[i].visible = false;
    //             }
    //             this.visible = false;
    //             this.event(Global.Event.FLOOR_OUT_DIE, this);
    //         }
    //     }
    //     /**
    //      * 碰撞检测
    //      * @param x 
    //      * @param y 
    //      */
    //     checkHit(x:number, y:number):boolean
    //     {
    //         if (x > this.x && x < (this.x + this.width) && y > this.y && y < (this.y + this.height)) {
    //             return true;
    //         }
    //         return false;
    //     }
    // }
    var MapContainer = /** @class */ (function (_super) {
        __extends(MapContainer, _super);
        function MapContainer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(MapContainer.prototype, "mainScene", {
            get: function () {
                return this._mainScene;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapContainer.prototype, "foodContainer", {
            get: function () {
                return this._foodContainer;
            },
            enumerable: true,
            configurable: true
        });
        MapContainer.prototype.init = function (mainScene) {
            this._mainScene = mainScene;
            this.initData();
            this.initUI(mainScene.sceneData.mapPath);
        };
        MapContainer.prototype.initData = function () {
            this._mapWidth = Global.Const.MAP_WIDTH;
            this._mapHeight = Global.Const.MAP_HEIGHT;
        };
        MapContainer.prototype.initUI = function (mapPath) {
            this._mapSpr = Game.ResMgr.instance.createSprite(mapPath, this._mapWidth, this._mapHeight);
            this.addChild(this._mapSpr);
            this._foodContainer = new Game.FoodContainer();
            this._foodContainer.init(this);
            this.addChild(this._foodContainer);
            this._buffContainer = new Game.BuffContainer();
            this._buffContainer.init(this);
            this.addChild(this._buffContainer);
            this._recycleContainer = new Game.RecycleContainer();
            this._recycleContainer.init(this);
            this.addChild(this._recycleContainer);
            this._enemyContainer = new Game.EnemyContainer();
            this._enemyContainer.init(this);
            this.addChild(this._enemyContainer);
            // let floor = this.addFloor(1);
            // floor.pos(0, Global.Const.GAME_HEIGHT - floor.height, true);
            // Laya.timer.frameLoop(1, this, this.onLoop);
        };
        MapContainer.prototype.resetElements = function () {
            this._foodContainer.resetFood();
            this._enemyContainer.resetEnemy();
            this._buffContainer.resetBuff();
            this._recycleContainer.resetRecycle();
        };
        MapContainer.prototype.getFood = function (foodId) {
            return this._foodContainer.getFood(foodId);
        };
        // onLoop():void 
        // {
        //     while(this._dieFloorList.length > 0) {
        //         let floor = this._dieFloorList.shift();
        //         floor.removeSelf();
        //         Laya.Pool.recover("floor", floor);
        //     }
        // }
        // addFloor(floorType:number):Floor 
        // {
        //     let floor:Floor = Laya.Pool.getItemByClass("floor", Floor);
        //     floor.init(floorType);
        //     floor.once(Global.Event.FLOOR_OUT_COMPLETE, this, this.getFloor);
        //     floor.once(Global.Event.FLOOR_OUT_DIE, this, this.delFloor);
        //     this.addChild(floor);
        //     this._liveFloorList.push(floor);
        //     return floor;
        // }
        // delFloor(floor:Floor):void 
        // {
        //     this._dieFloorList.push(floor);
        //     // this._liveFloorList.slice(1, 1);
        //     let len = this._liveFloorList.length;
        //     for (var i = 0; i < len; i++) {
        //         var tar = this._liveFloorList[i];
        //     }
        // }
        // getFloor(floor:Floor):void 
        // {
        //     this.addFloor(2);
        // }
        MapContainer.prototype.moveMap = function (angle) {
            if (angle == 0)
                return;
            var deltaPosX = Game.DataMgr.instance.roleData.walkSpeed * Math.cos(angle);
            var deltaPosY = Game.DataMgr.instance.roleData.walkSpeed * Math.sin(angle);
            var targetPosX = this.x - deltaPosX;
            var targetPosY = this.y - deltaPosY;
            var minPosX = -this._mapWidth + Global.Const.GAME_WIDTH * 0.5;
            var minPosY = -this._mapHeight + Global.Const.GAME_HEIGHT * 0.5;
            var maxPosX = Global.Const.GAME_WIDTH * 0.5;
            var maxPosY = Global.Const.GAME_HEIGHT * 0.5;
            if (targetPosX < minPosX)
                targetPosX = minPosX;
            if (targetPosX > maxPosX)
                targetPosX = maxPosX;
            if (targetPosY < minPosY)
                targetPosY = minPosY;
            if (targetPosY > maxPosY)
                targetPosY = maxPosY;
            this.pos(targetPosX, targetPosY);
        };
        /** 与玩家的检测碰撞 */
        MapContainer.prototype.checkPlayerCollision = function (x, y, radius) {
            if (radius === void 0) { radius = 0; }
            var myPlayerData = Game.DataMgr.instance.roleData;
            var xDelta = x - myPlayerData.x + this.x;
            var yDelta = y - myPlayerData.y + this.y;
            var distance = Math.sqrt(xDelta * xDelta + yDelta * yDelta);
            return distance <= myPlayerData.collisionRadius + radius;
        };
        return MapContainer;
    }(Sprite));
    Game.MapContainer = MapContainer;
})(Game || (Game = {}));
//# sourceMappingURL=Map.js.map