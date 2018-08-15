module Game {
    import Sprite = Laya.Sprite;

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
        init():void 
        {
            super.init();

            // 定时器检测
            Laya.timer.frameLoop(1, this, this.onLoop);
        }

        /** 重写父类函数 */
        destroy():void 
        {
            super.destroy();
        }

        onLoop():void 
        {
            let xPos = DataMgr.instance.myPlayerData.x;
            let yPos = DataMgr.instance.myPlayerData.y;

            this.hitArea();

        }
    }

    /**
     * 药剂buff容器（管理场景buff）
     */
    export class BuffContainer extends Sprite
    {
        // buff列表
        private _buffList:Array<Buff>;

        init():void 
        {
            this._buffList = [];
        }

        /** 创建buff */
        createBuff(id:number):Buff
        {
            let buff = new Buff(id);
            buff.init();
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