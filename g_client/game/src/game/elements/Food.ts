module Game {
    import Sprite = Laya.Sprite;

    /**
     * 食物类
     */
    class Food extends BaseElement
    {
        get data():Data.FoodData
        {
            return DataMgr.instance.getFoodData(this.id);
        }

        /** 重写父类函数 */
        init():void 
        {
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

        /** 创建食物 */
        createFood(id:number):Food
        {
            let food = new Food(id);
            food.init();
            return food;
        }

        /** 重置食物 */
        resetFood():void 
        {
            // 清理旧数据
            this.clearFood();

            let dataList = DataMgr.instance.foodDataList;
            if (dataList == null || dataList.length == 0) {
                return;
            }

            dataList.forEach(data => {
                let food = this.createFood(data.id);
                this.addChild(food);
                this._foodList[data.id] = food;
            });
        }

        /** 根据唯一ID，增加指定食物 */
        addFood(id:number):void 
        {
            if (this.checkFood(id)) {
                return;
            }

            let food = this.createFood(id);
            this.addChild(food);
            this._foodList[id] = food;
        }

        /** 根据唯一ID，移除指定食物 */
        removeFood(id:number):void 
        {
            if (!this.checkFood(id)) 
                return;

            let food = this._foodList[id];
            food.destroy();
            this._foodList[id] = null;
        }

        /** 清除食物 */
        clearFood():void 
        {
            if (!this.checkFoodList()) {
                return;
            }

            this._foodList.forEach(item => {
                item.destroy();
            });
            this._foodList = [];
        }

        /** 检测食物列表是否有数据 */
        checkFoodList():boolean 
        {
            return !(this._foodList == null || this._foodList.length == 0)
        }

        /** 根据唯一ID，检测食物是否存在 */
        checkFood(id:number):boolean
        {
            if (!this.checkFoodList()) {
                return false;
            }
            return this._foodList[id] != null;
        }
    }
}