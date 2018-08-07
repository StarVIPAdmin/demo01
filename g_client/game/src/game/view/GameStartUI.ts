module Game {
    import Sprite = Laya.Sprite;
    import Text = Laya.Text;

    /**
     * 游戏开始UI
     */
    export class GameStartUI extends Sprite 
    {
        private _bg:Sprite;
        private _txt:Text;

        onInit():void 
		{
            this.width = Global.Const.GAME_WIDTH;
            this.height = Global.Const.GAME_HEIGHT;

            this._bg = new Sprite();
            this._bg.alpha = 0.8;
            this._bg.graphics.drawRect(0, 0, this.width, this.height, "#000000");
            this.addChild(this._bg);

            this._txt = new Text();
            this._txt.fontSize = 20;
            this._txt.color = "#ffffff";
            this._txt.text = "游戏介绍\n\n疯狂的蚂蚁";
            this._txt.width = this.width;
            this._txt.align = "center";
            this._txt.y = 0.5 * (this.height - this._txt.height);
            this.addChild(this._txt);

            this.once(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
		}

        onMouseDown():void 
        {
            viewMgr.hideView(Global.ViewId.GAME_INFO_UI);
            Data.isGameOver = false;
        }
    }
}