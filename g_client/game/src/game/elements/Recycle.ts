module Game {
    import Sprite = Laya.Sprite;
    import Text = Laya.Text;

    /**
     * 食物回收点
     */
    class Recycle extends BaseElement 
    {
        get data():Data.RecycleData
        {
            return Data.recycleDataList[this.id];
        }

        /** 重写父类函数 */
        init():void 
        {
            this.size(512, 512);
            super.init();
        }

        /** 重写父类函数 */
        destroy():void 
        {
            super.destroy();
        }
    }

    export class RecycleContainer extends Sprite
    {
        // 回收点列表
        private _recycleList:Array<Recycle>;

        init():void 
        {
            this._recycleList = [];
        }

        createRecycle(id:number):Recycle
        {
            let recycle = new Recycle(id);
            recycle.init();
            return recycle;
        }

        addRecycle():void 
        {
            let recycle:Recycle;
            for (var i = 0; i < 3; i++) 
            {
                recycle = this.createRecycle(i);
                recycle.pos(i * 100, i * 100);
                this.addChild(recycle);
                this._recycleList[i] = recycle;
            }
        }

        removeRecycle(id:number):void 
        {
            let recycle:Recycle = this._recycleList[id];
            recycle.destroy();
            this._recycleList[id] = null;
        }

        clearRecycle():void 
        {
            this._recycleList.forEach(item => {
                item.destroy();
            });

            this._recycleList = [];
        }
    }
}