module Game {
    import Sprite = Laya.Sprite;

    /**
     * 食物类
     */
    export class Food extends Sprite
    {
        // 数据
        public data:Data.FoodData;

        // 图标
        private _icon:Sprite;

        init(foodId:number):void 
        {
            this.data.Id = foodId;
            this.data.cfgId = 1;
            this.data.type = Data.FoodType.BOTANY;

            let cfg:Object = {};

            let iconTexture = Laya.loader.getRes(Global.Path.PNG_ITEM_1);

            if (this._icon == null) {
                this._icon = new Sprite();
                this.addChild(this._icon);
            }

            this._icon.graphics.clear();
            this._icon.graphics.drawTexture(iconTexture, 0, 0, 32, 32);
        }
    }
}