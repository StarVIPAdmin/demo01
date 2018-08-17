module Game {
    import Sprite = Laya.Sprite;

    // buff类标识（用于对象池回收）
    const BUFF_CLASS_SIGN:string = "buff";

    /**
     * 药剂buff
     */
    class Buff extends BaseElement
    {
        get data():Data.BuffData
        {
            return DataMgr.instance.getBuffData(this.id);
        }

        /** 重写父类函数 */
        init(id:number):void 
        {
            super.init(id);
            // 定时器检测
            Laya.timer.frameLoop(1, this, this.onLoop);
        }

        /** 重写父类函数 */
        destroy():void 
        {
            super.destroy();
            Laya.timer.clear(this, this.onLoop);
            Laya.Pool.recover(BUFF_CLASS_SIGN, this);
        }

        onLoop():void 
        {
            // buff是否可以叠加，任何状态下都可以触发buff效果
            let parent = this.parent as BuffContainer;
            let isTouch = parent.mapContainer.checkPlayerCollision(this.x, this.y, this.data.collisionRadius);

            if (isTouch) {
                Laya.timer.clear(this, this.onLoop);
                // 玩家获取一个buff
                EventMgr.instance.event(Global.Event.GET_BUFF, [this.data.cfgId]);
                // 删除buff
                parent.removeBuff(this.data.id);
            }
        }
    }

    /**
     * 药剂buff容器（管理场景buff）
     */
    export class BuffContainer extends Sprite
    {
        // 父容器
        private _mapContainer:MapContainer;
        // buff列表
        private _buffList:Array<Buff>;

        get mapContainer():MapContainer
        {
            return this._mapContainer;
        }

        init(parentContainer:MapContainer):void 
        {
            this._mapContainer = parentContainer;
            this._buffList = [];
        }

        /** 创建buff */
        createBuff(id:number):Buff
        {
            let buff:Buff = Laya.Pool.getItemByClass(BUFF_CLASS_SIGN, Buff);
            buff.init(id);
            return buff;
        }

        /** 重置buff */
        resetBuff():void 
        {
            // 清理旧数据
            this.clearBuff();

            let dataList = DataMgr.instance.buffDataList;
            if (dataList == null || dataList.length == 0) {
                return;
            }

            dataList.forEach(data => {
                let buff = this.createBuff(data.id);
                this.addChild(buff);
                this._buffList[data.id] = buff;
            });
        }

        /** 根据唯一ID，增加指定buff */
        addBuff(id:number):void 
        {
            if (this.checkBuff(id)) {
                return;
            }

            let buff = this.createBuff(id);
            this.addChild(buff);
            this._buffList[id] = buff;
        }

        /** 根据唯一ID，移除指定buff */
        removeBuff(id:number):void 
        {
            if (!this.checkBuff(id)) 
                return;

            let buff = this._buffList[id];
            buff.destroy();
            this._buffList[id] = null;
            DataMgr.instance.removeBuffData(id);
        }

        /** 清除buff */
        clearBuff():void 
        {
            if (!this.checkBuffList()) 
                return;
            
            this._buffList.forEach(item => {
                item.destroy();
            });
            this._buffList = [];
            DataMgr.instance.buffDataList = [];
        }

        /** 检测buff列表是否有数据 */
        checkBuffList():boolean 
        {
            return !(this._buffList == null || this._buffList.length == 0)
        }

        /** 根据唯一ID，检测buff是否存在 */
        checkBuff(id:number):boolean 
        {
            if (!this.checkBuffList()) {
                return false;
            }
            return this._buffList[id] != null
        }
    }
}