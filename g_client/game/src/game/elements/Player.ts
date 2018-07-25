module Game {
    import Sprite = Laya.Sprite;
    import Animation = Laya.Animation;

    let cached:boolean = false;

    /**
     * 玩家类
     */
    export class Player extends Sprite 
    {   
        // 蓝条、血条
        private _mpBar:ProgressBar;
        private _hpBar:ProgressBar;

        // 动作名
        private _actName:string;
        // 玩家动画
        private _body:Animation;
        // 跳跃次数
        private _jumpCount:number;
        // 最大跳跃次数
        private _jumpCountMax:number;

        // 下落变量
        private _vy:number;
        // 下落速度
        private _downSpeed:number;
        // 最大下落变量
        private _maxVy:number;

        // 残影
        // private _bodyEffect1:Animation;
        // private _bodyEffect2:Animation;
        // 特效
        // private _spiritEffect:Sprite;

        constructor(hpBar:ProgressBar, mpBar:ProgressBar) 
        {
            super();
            this._mpBar = hpBar;
            this._hpBar = mpBar;
            this._actName = null;
            this._body = null;
            this._jumpCount = 0;
            this._jumpCountMax = 2;

            this._vy = 0;
            this._downSpeed = 2;
            this._maxVy = 32;

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
                // let texture = Laya.loader.getRes(Global.Path.PNG_SPIRIT_EFFECT);

                // this._spiritEffect = new Sprite();
                // this._spiritEffect.pivot(154 * 0.5, 190 * 0.5);
                // this._spiritEffect.visible = false;
                // this._spiritEffect.scale(5, 5);
                // this._spiritEffect.graphics.drawTexture(texture, 0, 0, 154, 190);
                // this.addChild(this._spiritEffect);

                // this._bodyEffect1 = new Animation();
                // this._bodyEffect1.alpha = 0.6;
                // this._bodyEffect1.pivot(80,60);
                // this._bodyEffect1.interval = 100;
                // this._bodyEffect1.visible = false;
                // this.addChild(this._bodyEffect1);
                
                // this._bodyEffect2 = new Animation();
                // this._bodyEffect2.alpha = 0.3;
                // this._bodyEffect2.pivot(110,60);
                // this._bodyEffect2.interval = 100;
                // this._bodyEffect2.visible = false;
                // this.addChild(this._bodyEffect2);

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
            // 玩家开始下落
            this.y += this._vy;
            this._vy += this._downSpeed;

            if (this._vy > this._maxVy) {
                this._vy = this._maxVy;
            }

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

        // 二级跳
        doubleJump():void 
        {
            if (this._jumpCount < this._jumpCountMax) {
                this._vy = -20;
                this._jumpCount++;
                this.gotoJump();
            } else {
                // this.gotoFly();
            }
        }

        // 跳跃结束重置
        jumpReset():void 
        {
            this._vy = 0;
            this._jumpCount = 0;
            this.gotoRun();
        }

        // inEffect():boolean 
        // {
        //     return this._bodyEffect1.visible;
        // }

        // showEffect():void 
        // {
        //     Data.isPause = true;
        //     Data.speed = Global.Const.MAX_SPEED;
        //     this._spiritEffect.visible = true;
        //     Laya.Tween.to(this._spiritEffect, {scaleX:0.1, scaleY:0.1, rotation:360}, 1000, null, Laya.Handler.create(this, this.spiritEffectTweenComplete));
        // }

        // hideEffect():void 
        // {
        //     this._bodyEffect1.visible = false;
        //     this._bodyEffect2.visible = false;
        //     Data.speed = Global.Const.MIN_SPEED;
        // }

        // spiritEffectTweenComplete():void 
        // {
        //     this._spiritEffect.visible = false;
        //     this._spiritEffect.scale(5, 5);
        //     this._bodyEffect1.visible = true;
        //     this._bodyEffect2.visible = true;
        //     Data.isPause = false;
        // }
    }
}