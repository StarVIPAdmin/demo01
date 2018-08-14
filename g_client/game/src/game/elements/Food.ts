module Game {
    import Sprite = Laya.Sprite;

    /**
     * 食物类
     */
    class Food extends BaseElement
    {
        get data():Data.FoodData
        {
            return Data.foodDataList[this.id];
        }

        /** 重写父类函数 */
        init():void 
        {
            this.size(128, 128);
            super.init();
        }

        /** 重写父类函数 */
        destroy():void 
        {
            super.destroy();
        }
    }

    /**
     * 食物类容器
     */
    export class FoodContainer extends Sprite
    {
        // 食物列表
        private _foodList:Array<Food>;

        init():void
        {
            this._foodList = [];
        }

        createFood(id:number):Food
        {
            let food = new Food(id);
            food.init();
            return food;
        }

        addFood():void 
        {
            let food:Food;
            for (var i = 0; i < 5; i++) 
            {
                food = this.createFood(i);
                food.pos(i * 10, i * 10);
                this.addChild(food);
                this._foodList[i] = food;
            }
        }

        removeFood(id:number):void 
        {
            let food = this._foodList[id];
            food.destroy();
            this._foodList[id] = null;
        }

        clearFood():void 
        {
            this._foodList.forEach(item => {
                item.destroy();
            });

            this._foodList = [];
        }
    }
}