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
     * 单个地板类
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
                this._bgTexture = Laya.loader.getRes(Global.Path.PNG_FLOOR);
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
                    item = Laya.Pool.getItemByClass("item", Game.Item);
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
            if (Data.isPause || Data.isOver)
                return;
            this.x += Dir * Data.speed * 1.2;
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
})(Game || (Game = {}));
//# sourceMappingURL=Floor.js.map