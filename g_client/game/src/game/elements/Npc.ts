module Game {
    import Sprite = Laya.Sprite;
    import Animation = Laya.Animation;

    let cached:boolean = false;
    const BIRD:string = "bird";

    /**
     * 电脑AI
     */
    export class Npc extends Sprite 
    {
        private _body:Animation;

        constructor() 
        {
            super();
            this._body = null;
            this.init();
        }

        init():void 
        {
            if (!cached) {
                cached = true;
                Animation.createFrames([Global.Path.PNG_BIRD_1, Global.Path.PNG_BIRD_2, Global.Path.PNG_BIRD_3, Global.Path.PNG_BIRD_4], BIRD);
            }

            if (this._body == null) {
                this._body = new Animation();
                this._body.interval = 100;
                this.addChild(this._body);
            }

            this._body.x = Global.Const.GAME_WIDTH;
            this._body.y = Math.random() * Global.Const.GAME_HEIGHT;
            this._body.play(0, true, BIRD);

            Laya.timer.frameLoop(1, this, this.onLoop);
        }

        onLoop():void 
        {
            if (Data.isOver) {
                return;
            }

            this._body.x -= Data.speed * 1.5;
            if (this._body.x < -100) {
                this.removeSelf();
                Laya.Pool.recover("npc", this);
                Laya.timer.clear(this, this.onLoop);
            }
        }
    }
}