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
            return DataMgr.instance.getRecycleData(this.id);
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

    export class RecycleContainer extends Sprite
    {
        // 父容器
        private _mapContainer:MapContainer;
        // 回收点列表
        private _recycleList:Array<Recycle>;

        init(parentContainer:MapContainer):void 
        {
            this._mapContainer = parentContainer;
            this._recycleList = [];
        }
        
        /** 创建回收点 */
        createRecycle(id:number):Recycle
        {
            let recycle = new Recycle(id);
            recycle.init();
            return recycle;
        }

        /** 重置回收点 */
        resetRecycle():void 
        {
            // 清理旧数据
            this.clearRecycle();

            let dataList = DataMgr.instance.recycleDataList;
            if (dataList == null || dataList.length == 0) {
                return;
            }

            dataList.forEach(data => {
                let recycle = this.createRecycle(data.id);
                this.addChild(recycle);
                this._recycleList[data.id] = recycle;
            });
        }

        /** 清除回收点 */
        clearRecycle():void 
        {
            if (this._recycleList == null || this._recycleList.length == 0) {
                return;
            }
            this._recycleList.forEach(item => {
                item.destroy();
            });
            this._recycleList = [];
        }
    }
}