module Game {
    import Sprite = Laya.Sprite;

    /**
     * 单个地板类
     */
    export class Floor extends Sprite 
    {
        private _bgTexture:any;

        private _maxRight:number;

        private _isOutComplete:boolean;

        private _bg:Sprite;

        private _rightBg:Sprite;

        private _itemList:Array<Item>;

        constructor() 
        {
            super();

            this._bgTexture = null;
            this._maxRight = 0;
            this._isOutComplete = false;
            this._bg = null;
            this._rightBg = null;
            this._itemList = [];
        }

        init(floorType:number):void 
        {
            let needItem = true;
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
                this._rightBg.graphics.drawTexture(Laya.Texture.createFromTexture(this._bgTexture, 32*29,0,32,96), 0, 0, 32, 96);
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
                    let w = 32 * (3 + 19 * Math.random());
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
        }

        addItem():void 
        {
            let m = Math.random() * 10;
            if (m < 5) return;

            let addNum = 0;
            let maxNum = this.width / 32;
            if (maxNum > 5) {
                addNum = 5 + (maxNum - 5) * Math.random();
            } else {
                addNum = maxNum;
            }

            let sx = (this.width - addNum * 32) * 0.5;
            let arr = [];
            let randNum;
            let specialItem = false;
            let item;
            for (var i = 0; i < addNum; i++) {
                if (i % 2 == 0) continue;
                randNum = Math.random();

                if (this._itemList.length > 0) {
                    item = this._itemList.shift();
                    item.visible = true;
                } else {
                    item = Laya.Pool.getItemByClass("item", Item);
                }
                
                if (randNum > 0.95 && !specialItem) {
                    specialItem = true;
                    item.init(Global.Const.ITEM_TYPE_SPEED);
                } else if (randNum > 0.9 && !specialItem) {
                    specialItem = true;
                    item.init(Global.Const.ITEM_TYPE_FLY);
                } else {
                    item.init(Global.Const.ITEM_TYPE_STAR);
                }

                item.x = sx + i * 32;
                item.y = -30;
                this.addChild(item);
                arr.push(item);
            }

            this._itemList = [].concat(arr);
        }

        getItems():Array<Item> 
        {
            return this._itemList;
        }

        /**
         * 移动
         * @param Dir 方向 1 →移动， -1←移动
         */
        move(Dir:number):void 
        {
            if (Data.isPause || Data.isOver) return;
            this.x += Dir * Data.speed * 1.2;

            if (!this._isOutComplete && (this.x + this.width) < this._maxRight) {
                this._isOutComplete = true;
                this.event(Global.Event.FLOOR_OUT_COMPLETE, this);
            } else if ((this.x + this.width) < 0) {
                for (var i = 0; i < this._itemList.length; i++) {
                    this._itemList[i].visible = false;
                }
                this.visible = false;
                this.event(Global.Event.FLOOR_OUT_DIE, this);
            }
        }

        /**
         * 碰撞检测
         * @param x 
         * @param y 
         */
        checkHit(x:number, y:number):boolean
        {
            if (x > this.x && x < (this.x + this.width) && y > this.y && y < (this.y + this.height)) {
                return true;
            }
            return false;
        }
    }
}