module Game {
    import Text = Laya.Text;
    import Button = Laya.Button;
    import Sprite = Laya.Sprite;

    /**
     * 资源管理类
     */
    export class ResMgr extends Core.BaseSingleton 
    {
        /** 获取单例实例 */
        static get instance():ResMgr
        {
            return super.getInstanceOrCreate(ResMgr);
        }

        /** 重写父类函数 */
        protected onCreate():void 
        {
        }

        /** 重写父类函数 */
        protected onDestroy():void
        {
        }

        // 创建按钮
        createButton(skinPath:string):Button
        {
            let btn = new Button(skinPath);
            btn.autoSize = true;
            btn.anchorX = 0.5;
            btn.anchorY = 0.5;
            return btn;
        }

        // 创建文本
        createText():Text
        {
            let txt = new Text();
            txt.fontSize = 20;
            txt.color = "#ffffff";
            txt.text = "";
            txt.align = "left";
            txt.size(100, 100).pos(0, 0);
            return txt;
        }

        // 创建图片
        createSprite(url:string, width:number, height:number, xPos:number=0, yPos:number=0):Sprite
        {
            let spr = new Sprite();
            spr.graphics.clear();
            spr.graphics.drawTexture(Laya.loader.getRes(url),0,0,width,height);
            spr.size(width,height).pos(xPos,yPos);
            return spr;
        }
    }
}