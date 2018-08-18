module Game {
    import Sprite = Laya.Sprite;
    import Text = Laya.Text;

    // 食物回收点类标识（用于对象池回收）
    const RECYCLE_CLASS_SIGN:string = "recycle";

    /**
     * 食物回收点
     */
    class Recycle extends BaseElement 
    {
        // 锁定状态
        private _isLock:boolean;

        get data():Data.RecycleData
        {
            return DataMgr.instance.getRecycleData(this.id);
        }

        /** 重写父类函数 */
        init(id:number):void 
        {
            super.init(id);
            this._isLock = false;
            // 定时器检测
            Laya.timer.frameLoop(1, this, this.onLoop);
        }

        /** 重写父类函数 */
        destroy():void 
        {
            super.destroy();
            Laya.timer.clear(this, this.onLoop);
            Laya.Pool.recover(RECYCLE_CLASS_SIGN, this);
        }

        onLoop():void 
        {
            let parent = this.parent as RecycleContainer;
            let isTouch = parent.mapContainer.checkPlayerCollision(this.x, this.y, this.data.collisionRadius);

            if (isTouch) {
                // 走进回收点范围
                this.setRecycleLock(true);
            } else if (this._isLock) {
                // 走出回收点范围
                this.setRecycleLock(false);
            }
        }

        /** 设置锁定状态 */
        setRecycleLock(bool:boolean):void 
        {
            this._isLock = bool;
            // 通知玩家
            EventMgr.instance.event(Global.Event.IN_RECYCLE_AREA, [bool]);
        }
    }

    export class RecycleContainer extends Sprite
    {
        // 父容器
        private _mapContainer:MapContainer;
        // 回收点列表
        private _recycleList:Array<Recycle>;

        get mapContainer():MapContainer
        {
            return this._mapContainer;
        }

        init(parentContainer:MapContainer):void 
        {
            this._mapContainer = parentContainer;
            this._recycleList = [];
        }
        
        /** 创建回收点 */
        createRecycle(id:number):Recycle
        {
            let recycle:Recycle = Laya.Pool.getItemByClass(RECYCLE_CLASS_SIGN, Recycle);
            recycle.init(id);
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