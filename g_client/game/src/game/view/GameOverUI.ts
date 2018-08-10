module Game {
    import Sprite = Laya.Sprite;
    import Text = Laya.Text;

    /**
     * 游戏结束类
     */
    export class GameOverUI extends Sprite 
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
            this._descTxt.fontSize = 30;
            this._descTxt.color = "#ffffff";
            this._descTxt.text = "开始游戏\n\n点击开始";
            this._descTxt.width = this.width;
            this._descTxt.align = "center";
            this.addChild(this._descTxt);

            this.once(Laya.Event.MOUSE_DOWN, this, this.onGameOver);
		}

        onShow(Score:any):void 
        {
            this.setScore(Score);
        }

		setScore(NewScore:number):void 
		{
            let score = localStorage.getItem("runGameScore");
            if (score && parseInt(score) > NewScore) {
                NewScore = parseInt(score);
            }

            localStorage.setItem("runGameScore", NewScore.toString());
            this._descTxt.text = "开始结束\n\n点击重新开始\n\n最终得分：" + NewScore;
            this._descTxt.y = 0.5 * (Global.Const.GAME_HEIGHT - this._descTxt.height);
		}

        onGameOver():void 
        {
            location.reload();
        }
    }
}