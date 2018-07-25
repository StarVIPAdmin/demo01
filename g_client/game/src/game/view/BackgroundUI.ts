module Game {
    import Sprite = Laya.Sprite;
    
    const BG_WIDTH:number = 1600;

    /**
     * 背景类
     */
    export class BackgroundUI extends Sprite 
    {
        private _moveX:number;
        private _bg1:Sprite;
        private _bg2:Sprite;
        private _grass:Sprite;

        constructor() 
        {
            super();
            this._moveX = 0;
            this._bg1 = null;
            this._bg2 = null;
            this._grass = null;
            this.init();
        }

        init():void 
        {
            let texture1 = Laya.loader.getRes(Global.Path.PNG_BACKGROUND);
            let texture2 = Laya.loader.getRes(Global.Path.PNG_M_BACKGROUND);

            this._bg1 = new Sprite();
            this._bg1.graphics.drawTexture(texture1, 0, 0);
            this.addChild(this._bg1);

            this._bg2 = new Sprite();
            this._bg2.graphics.drawTexture(texture1, 0, 0);
            this.addChild(this._bg2);
            this._bg2.pos(BG_WIDTH, 0);

            this._grass = new Sprite();
            this._grass.graphics.drawTexture(texture2, 0, 0);
            this.addChild(this._grass);
        }

        move(ToRight:boolean = true):void 
        {
            if (Data.isPause || Data.isOver) return;

            if (ToRight) {
                this.x -= Data.speed * 0.5;
            } else {
                this.x += Data.speed * 0.5;
            }
            this._moveX = Math.abs(this.x);

            if (this._moveX - this._bg1.x >= BG_WIDTH) {
                this._bg1.x += BG_WIDTH * 2;
            }

            if (this._moveX - this._bg2.x >= BG_WIDTH) {
                this._bg2.x += BG_WIDTH * 2;
            }

            this._grass.x -= 5 * 0.5;
            if (this._grass.x + 960 < 0) {
                this._grass.x = this._moveX + Global.Const.GAME_WIDTH;
            }
        }
    }
}