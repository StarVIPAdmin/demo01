module Game {
	import Sprite = Laya.Sprite;
	import Text = Laya.Text;

	/**
	* loading类
	*/
	export class LoadingUI extends Sprite
	{
		private _bg:Sprite;
		private _txt:Text;
		private _loadedFunc:Function;

		constructor() 
		{
			super();
			this._bg = null;
			this._txt = null;
			this.onInit();
		}

		onInit():void
		{
			//黑色背景
			this._bg = new Sprite();
			this._bg.graphics.drawRect(0,0,Global.Const.GAME_WIDTH,Global.Const.GAME_HEIGHT,"#000000");
			this.addChild(this._bg);
			
			//loading文本
			this._txt = new Text();
			this._txt.color = "#ffffff";
			this._txt.fontSize = 30;
			this._txt.text = "Loading";
			this._txt.width = Global.Const.GAME_WIDTH;
			this._txt.align = "center";
			this._txt.y = (Global.Const.GAME_WIDTH - this._txt.height) * 0.5;
			this.addChild(this._txt);
		}

		onShow(Url:Array<any>, LoadedFunc:Function):void
		{
			this._loadedFunc = LoadedFunc;
			this._txt.text = "0%";

			Game.loaderMgr.loadRes(Url, this.onLoaded, this.onLoading);
			Core.LayerMgr.instance.addChildToDialog(this);
		}

		onLoaded = () => {
			if (this._loadedFunc) {
				this._loadedFunc();
				this._loadedFunc = null;
			}
			this.removeSelf();
		}

		onLoading = (Progress:number) => {
			this._txt.text = "Loading " + Math.floor(Progress * 100) + "%";
		}
	}
}