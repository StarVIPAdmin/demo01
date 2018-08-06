module Game {
    import Sprite = Laya.Sprite;
    import Animation = Laya.Animation;

    let cached:boolean = false;

    /**
     * 玩家类
     */
    export class Player extends Sprite 
    {   
        // 数据
        public data:Data.PlayerData;

        // 能量条
        private _powerBar:ProgressBar;

        // 动作名
        private _actName:string;
        // 玩家动画
        private _body:Animation;

        constructor(bar:ProgressBar) 
        {
            super();
            this._powerBar = bar;
            this._actName = null;
            this._body = null;

            // this._bodyEffect1 = null;
            // this._bodyEffect2 = null;
            // this._spiritEffect = null;

            this.width = 96;
            this.height = 96;

            this.init();
        }

        init():void 
        {
            if (!cached) {
                cached = true;
                Animation.createFrames([Global.Path.PNG_PLAYER_CHARA_1,Global.Path.PNG_PLAYER_CHARA_2,Global.Path.PNG_PLAYER_CHARA_3,Global.Path.PNG_PLAYER_CHARA_4], Global.Const.PLAYER_STATE_RUN);
                Animation.createFrames([Global.Path.PNG_PLAYER_CHARA_5,Global.Path.PNG_PLAYER_CHARA_6,Global.Path.PNG_PLAYER_CHARA_7,Global.Path.PNG_PLAYER_CHARA_8], Global.Const.PLAYER_STATE_FLY);
                Animation.createFrames([Global.Path.PNG_PLAYER_CHARA_9,Global.Path.PNG_PLAYER_CHARA_10,Global.Path.PNG_PLAYER_CHARA_11,Global.Path.PNG_PLAYER_CHARA_12], Global.Const.PLAYER_STATE_HERT);
                Animation.createFrames([Global.Path.PNG_PLAYER_CHARA_13,Global.Path.PNG_PLAYER_CHARA_14,Global.Path.PNG_PLAYER_CHARA_15,Global.Path.PNG_PLAYER_CHARA_16], Global.Const.PLAYER_STATE_JUMP);
            }

            if (this._body == null) {
                this._body = new Animation();
                this._body.pivot(48,60);
                this._body.interval = 100;
                this.addChild(this._body);
            }

            this.playAction(Global.Const.PLAYER_STATE_RUN);

            Laya.timer.frameLoop(1, this, this.onLoop);
        }

        playAction(ActName:string):void 
        {
            if (this._actName == ActName) {
                return;
            }
            this._actName = ActName;
            this._body.play(0, true, this._actName);
            // this._bodyEffect1.play(0, true, this._actName);
            // this._bodyEffect2.play(0, true, this._actName);
        }

        onLoop():void 
        {

            // 判定玩家是否死亡
            if (this.y > (Global.Const.GAME_HEIGHT + 100)) {
                this.event(Global.Const.PLAYER_STATE_DIE, this);
                return;
            }
        }

        gotoRun():void 
        {
            this.playAction(Global.Const.PLAYER_STATE_RUN);
        }

        gotoJump():void 
        {
            this.playAction(Global.Const.PLAYER_STATE_JUMP);
        }

        gotoFly():void 
        {
            this.playAction(Global.Const.PLAYER_STATE_FLY);
        }

        gotoHert():void 
        {
            this.playAction(Global.Const.PLAYER_STATE_HERT);
        }
    }
}