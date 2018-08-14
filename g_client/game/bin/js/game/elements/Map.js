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
    var Floor = /** @class */ (function (_super) {
        __extends(Floor, _super);
        function Floor() {
            var _this = _super.call(this) || this;
            _this._bgTexture = null;
            _this._maxRight = 0;
            _this._isOutComplete = false;
            _this._bg = null;
            _this._rightBg = null;
            _this._itemList = [];
            return _this;
        }
        Floor.prototype.init = function (floorType) {
            var needItem = true;
            this.autoSize = true;
            this._maxRight = 0;
            this.x = Global.Const.GAME_WIDTH;
            this.y = 32 * 6 + 32 * 8 * Math.random();
            if (this._bg == null) {
                this._bgTexture = Laya.loader.getRes(Global.Path.PNG_BUFF_1);
                this._bg = new Sprite();
                this._bg.graphics.clear();
                this.addChild(this._bg);
                this._rightBg = new Sprite();
                this._rightBg.graphics.drawTexture(Laya.Texture.createFromTexture(this._bgTexture, 32 * 29, 0, 32, 96), 0, 0, 32, 96);
                this._rightBg.width = 32;
                this.addChild(this._rightBg);
            }
            switch (floorType) {
                case 1:
                    this._rightBg.visible = false;
                    this._bg.graphics.drawTexture(this._bgTexture, 0, 0, 960, 96);
                    needItem = false;
                    break;
                default:
                    var w = 32 * (3 + 19 * Math.random());
                    this._bg.graphics.clear();
                    this._bg.graphics.drawTexture(Laya.Texture.createFromTexture(this._bgTexture, 0, 0, w, 96), 0, 0, w, 96);
                    this._rightBg.visible = true;
                    this._rightBg.x = w;
                    break;
            }
            this._maxRight = Global.Const.GAME_WIDTH - 32 * 2 - 32 * 10 * Math.random();
            if (needItem) {
                this.addItem();
            }
        };
        Floor.prototype.addItem = function () {
            var m = Math.random() * 10;
            if (m < 5)
                return;
            var addNum = 0;
            var maxNum = this.width / 32;
            if (maxNum > 5) {
                addNum = 5 + (maxNum - 5) * Math.random();
            }
            else {
                addNum = maxNum;
            }
            var sx = (this.width - addNum * 32) * 0.5;
            var arr = [];
            var randNum;
            var specialItem = false;
            var item;
            for (var i = 0; i < addNum; i++) {
                if (i % 2 == 0)
                    continue;
                randNum = Math.random();
                if (this._itemList.length > 0) {
                    item = this._itemList.shift();
                    item.visible = true;
                }
                else {
                    item = Laya.Pool.getItemByClass("item", Food);
                }
                if (randNum > 0.95 && !specialItem) {
                    specialItem = true;
                    item.init(Global.Const.ITEM_TYPE_SPEED);
                }
                else if (randNum > 0.9 && !specialItem) {
                    specialItem = true;
                    item.init(Global.Const.ITEM_TYPE_FLY);
                }
                else {
                    item.init(Global.Const.ITEM_TYPE_STAR);
                }
                item.x = sx + i * 32;
                item.y = -30;
                this.addChild(item);
                arr.push(item);
            }
            this._itemList = [].concat(arr);
        };
        Floor.prototype.getItems = function () {
            return this._itemList;
        };
        /**
         * 移动
         * @param Dir 方向 1 →移动， -1←移动
         */
        Floor.prototype.move = function (Dir) {
            if (Data.isGameOver)
                return;
            this.x += Dir * 0.2 * 1.2;
            if (!this._isOutComplete && (this.x + this.width) < this._maxRight) {
                this._isOutComplete = true;
                this.event(Global.Event.FLOOR_OUT_COMPLETE, this);
            }
            else if ((this.x + this.width) < 0) {
                for (var i = 0; i < this._itemList.length; i++) {
                    this._itemList[i].visible = false;
                }
                this.visible = false;
                this.event(Global.Event.FLOOR_OUT_DIE, this);
            }
        };
        /**
         * 碰撞检测
         * @param x
         * @param y
         */
        Floor.prototype.checkHit = function (x, y) {
            if (x > this.x && x < (this.x + this.width) && y > this.y && y < (this.y + this.height)) {
                return true;
            }
            return false;
        };
        return Floor;
    }(Sprite));
    Game.Floor = Floor;
    var MapContainer = /** @class */ (function (_super) {
        __extends(MapContainer, _super);
        function MapContainer() {
            var _this = _super.call(this) || this;
            _this._dieFloorList = [];
            _this._liveFloorList = [];
            _this.onInit();
            return _this;
        }
        MapContainer.prototype.onInit = function () {
            this._mapSpr = new Sprite();
            this._mapSpr.graphics.clear();
            this._mapSpr.graphics.drawTexture(Laya.loader.getRes(Global.Path.JPG_BACKGROUND), 0, 0, 5120, 5120);
            this.addChild(this._mapSpr);
            // let floor = this.addFloor(1);
            // floor.pos(0, Global.Const.GAME_HEIGHT - floor.height, true);
            // Laya.timer.frameLoop(1, this, this.onLoop);
        };
        MapContainer.prototype.onLoop = function () {
            while (this._dieFloorList.length > 0) {
                var floor = this._dieFloorList.shift();
                floor.removeSelf();
                Laya.Pool.recover("floor", floor);
            }
        };
        MapContainer.prototype.addFloor = function (floorType) {
            var floor = Laya.Pool.getItemByClass("floor", Floor);
            floor.init(floorType);
            floor.once(Global.Event.FLOOR_OUT_COMPLETE, this, this.getFloor);
            floor.once(Global.Event.FLOOR_OUT_DIE, this, this.delFloor);
            this.addChild(floor);
            this._liveFloorList.push(floor);
            return floor;
        };
        MapContainer.prototype.delFloor = function (floor) {
            this._dieFloorList.push(floor);
            // this._liveFloorList.slice(1, 1);
            var len = this._liveFloorList.length;
            for (var i = 0; i < len; i++) {
                var tar = this._liveFloorList[i];
            }
        };
        MapContainer.prototype.getFloor = function (floor) {
            this.addFloor(2);
        };
        MapContainer.prototype.moveMap = function (angle) {
            if (angle == 0)
                return;
            var deltaPosX = Data.myPlayerData.speed * Math.cos(angle);
            var deltaPosY = Data.myPlayerData.speed * Math.sin(angle);
            var targetPosX = this._mapSpr.x - deltaPosX;
            var targetPosY = this._mapSpr.y - deltaPosY;
            var minPosX = -5120 + Global.Const.GAME_WIDTH * 0.5;
            var minPosY = -5120 + Global.Const.GAME_HEIGHT * 0.5;
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
            this._mapSpr.pos(targetPosX, targetPosY);
        };
        return MapContainer;
    }(Sprite));
    Game.MapContainer = MapContainer;
})(Game || (Game = {}));
//# sourceMappingURL=Map.js.map