module Game {
    import Sprite = Laya.Sprite;

    /**
     * 物品类
     */
    export class Item extends Sprite 
    {
        // 物品类型
        public type:string;
        // 图标
        private _icon:Sprite;
        // 星星、加速、悬空贴图
        private _starTexture:any;
        private _speedTexture:any;
        private _flyTexture:any;

        constructor() 
        {
            super();
            this._icon = null;
            this._starTexture = null;
            this._speedTexture = null;
            this._flyTexture = null;
            this.type = "";
        }

        init(ItemType:string):void 
        {
            this.type = ItemType;

            if (this._icon == null) {
                this._starTexture = Laya.loader.getRes(Global.Path.PNG_ITEM_1);
                this._speedTexture = Laya.loader.getRes(Global.Path.PNG_ITEM_3);
                this._flyTexture = Laya.loader.getRes(Global.Path.PNG_ITEM_4);
                this._icon = new Sprite();
                this.addChild(this._icon);
            }

            this._icon.graphics.clear();

            switch (ItemType) {
                case Global.Const.ITEM_TYPE_STAR:
                    this._icon.graphics.drawTexture(this._starTexture, 0, 0, 32, 32);
                    break;
                case Global.Const.ITEM_TYPE_SPEED:
                    this._icon.graphics.drawTexture(this._speedTexture, 0, 0, 32, 32);
                    break;
                case Global.Const.ITEM_TYPE_FLY:
                    this._icon.graphics.drawTexture(this._flyTexture, 0, 0, 32, 32);
                    break;
                default:
                    break;
            }
        }
    }
}