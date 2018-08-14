module Game {
    import Sprite = Laya.Sprite;

    /**
     * 药剂buff
     */
    class Buff extends BaseElement
    {
        get data():Data.BuffData
        {
            return Data.buffDataList[this.id];
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

        createBuff(id:number):Buff
        {
            let buff = new Buff(id);
            buff.init();
            return buff;
        }

        addBuff():void 
        {
            let buff:Buff;
            for (var i = 0; i < 5; i++) 
            {
                buff = this.createBuff(i);
                this._buffList[i] = buff;
            }
        }

        removeBuff(id:number):void 
        {
            let buff:Buff = this._buffList[id];
            buff.destroy();
            this._buffList[id] = null;
        }

        clearBuff():void 
        {
            this._buffList.forEach(item => {
                item.destroy();
            });

            this._buffList = [];
        }
    }
}