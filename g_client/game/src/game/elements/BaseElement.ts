module Game {
    import Sprite = Laya.Sprite;
    import Text = Laya.Text;

    import BaseData = Data.BaseData;

    /**
     * 元素基础类
     */
    export class BaseElement extends Sprite
    {
        /** 唯一ID */
        protected id:number;
        /** 昵称 */
        protected nickTxt:Text;
        /** 图标 */
        protected bodySpr:Sprite;

        get data():BaseData
        {
            return null;
        }

        constructor()
        {
            super();
            this.id = null;
            this.nickTxt = null;
            this.bodySpr = null;
        }

        /** 初始化 */
        init(id:number):void 
        {
            this.id = id;
            if (this.data == null) {
                return;
            }
            this.pivot(this.data.width*0.5,this.data.height*0.5).size(this.data.width,this.data.height).pos(this.data.x,this.data.y);
            
            if (this.bodySpr == null) {
                this.bodySpr = ResMgr.instance.createSprite(this.data.bodyPath,this.width,this.height);
                this.addChild(this.bodySpr);
            }

            if (this.nickTxt == null) {
                this.nickTxt = ResMgr.instance.createText();
                this.nickTxt.align = "center";
                this.nickTxt.text = this.data.nick;
                this.nickTxt.pos(this.bodySpr.width * 0.5 - this.nickTxt.width * 0.5, 0);
                this.addChild(this.nickTxt);
            }
        }

        /** 消毁 */
        destroy():void 
        {
            if (this.nickTxt != null) {
                this.nickTxt.removeSelf();
                this.nickTxt = null;
            }

            if (this.bodySpr != null) {
                this.bodySpr.removeSelf();
                this.bodySpr = null;
            }
            this.removeSelf();
        }
    }
}