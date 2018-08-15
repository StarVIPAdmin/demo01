module Game {
    import Sprite = Laya.Sprite;
    import Text = Laya.Text;

    /**
     * 游戏开始UI
     */
    export class GameStartUI extends Sprite 
    {
        private _bg:Sprite;
        private _descTxt:Text;

        onInit():void 
		{
            this.width = Global.Const.GAME_WIDTH;
            this.height = Global.Const.GAME_HEIGHT;

            this._bg = new Sprite();
            this._bg.alpha = 0.8;
            this._bg.graphics.drawRect(0, 0, this.width, this.height, "#000000");
            this.addChild(this._bg);

            this._descTxt = new Text();
            this._descTxt.fontSize = 20;
            this._descTxt.color = "#ffffff";
            this._descTxt.text = "游戏介绍\n\n疯狂的蚂蚁";
            this._descTxt.width = this.width;
            this._descTxt.align = "center";
            this._descTxt.y = 0.5 * (this.height - this._descTxt.height);
            this.addChild(this._descTxt);

            this.once(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
		}

        onMouseDown():void 
        {
            viewMgr.hideView(Global.ViewId.GAME_INFO_UI);
            DataMgr.instance.isGameOver = false;
        }
    }
}