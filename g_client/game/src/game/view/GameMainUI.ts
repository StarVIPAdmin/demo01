module Game {
    import Sprite = Laya.Sprite;
    import Text = Laya.Text;
    import Event = Laya.Event;

    /**
     * 游戏主UI
     */
    export class GameMainUI extends Sprite 
    {
        // 摇杆半径
        private readonly radius:number = 500;

        // 体力条
        private _powerBar:ProgressBar;
        // 攻击力
        private _attack:Text;
        // 速度
        private _speed:Text;
        // 得分
        private _score:Text;

        // 摇杆
        private _moveBG:Sprite;
        private _moveIcon:Sprite;

        constructor() 
        {
            super();
            this.init();
            this.initEvent();
        }

        init():void 
        {
            this._powerBar = new ProgressBar(Global.Const.BAR_TYPE_MP);
            this._powerBar.pos(10, 7);
            this.addChild(this._powerBar);

            this._attack = ResMgr.getInstance().createText();
            this._attack.pos(10, 27);
            this.addChild(this._attack);

            this._speed = ResMgr.getInstance().createText();
            this._speed.pos(10, 47);
            this.addChild(this._speed);

            this._score = ResMgr.getInstance().createText();
            this._score.align = "right";
            this._score.pos(Global.Const.GAME_WIDTH - 120, 7);
            this.addChild(this._score);

            this._moveBG = new Sprite();
            this._moveBG.graphics.clear();
            this.addChild(this._moveBG);
            this._moveBG.graphics.drawTexture(Laya.loader.getRes(Global.Path.PNG_COMBAT_MOVE_BG),0,0,222,222);
            this._moveBG.size(222, 222).pos(30, Global.Const.GAME_HEIGHT - 30 - 222);

            this._moveIcon = new Sprite();
            this._moveIcon.graphics.clear();
            this._moveBG.addChild(this._moveIcon);
            this._moveIcon.graphics.drawTexture(Laya.loader.getRes(Global.Path.PNG_COMBAT_MOVE_ICON),0,0,95,95);
            this.setMoveIconPos(111, 111);

            this.refreshAttackTxt(0);
            this.refreshSpeedTxt(0);
            this.refreshScoreTxt(0);

            let dragRegion = new Laya.Rectangle();
        }

        initEvent():void 
        {
            this._moveBG.on(Event.MOUSE_UP, this, this.onMouseUp);
            this._moveBG.on(Event.MOUSE_DOWN, this, this.onMouseDown);
            this._moveBG.on(Event.MOUSE_MOVE, this, this.onMouseMove);
        }

        // 刷新得分
        refreshScoreTxt(Value:number):void 
        {
            this._score.text = "得分：" + Value;
        }

        // 刷新战斗力
        refreshAttackTxt(Value:number):void 
        {
            this._attack.text = "攻击力：" + Value;
        }

        // 刷新速度
        refreshSpeedTxt(Value:number):void 
        {
            this._speed.text = "速度：" + Value;
        }

        onMouseUp(evt:Event):void 
        {
            this._moveBG.alpha = 1;
            this.setMoveIconPos(111, 111);
        }

        onMouseDown(evt:Event):void 
        {
            this._moveBG.alpha = 0.6;
            // this._moveIcon.startDrag(, false, 0);
            this.checkMoveIconPos();
        }

        onMouseMove(evt:Event):void 
        {
            // console.log("00---->", Laya.stage.mouseX);
            // console.log("00---->", Laya.stage.mouseY);
        }

        checkMoveIconPos():void 
        {
            let initPosx = this._moveBG.x + 111;
            let initPosy = this._moveBG.y + 111;

            let touchPosx = Laya.stage.mouseX;
            let touchPosy = Laya.stage.mouseY;

            let deltaPosx = touchPosx - initPosx;
            let deltaPosy = touchPosy - initPosy;

            let distance = Math.sqrt(deltaPosx * deltaPosx + deltaPosy * deltaPosy);

            if (distance > this.radius) {
                let targetPosx = this.radius * deltaPosx / distance + 111; 
                let targetPosy = this.radius * deltaPosy / distance + 111;
                this.setMoveIconPos(targetPosx, targetPosy);
            } else {
                this.setMoveIconPos(touchPosx - initPosx, touchPosy - initPosy);
            }
        }

        setMoveIconPos(PosX:number, PosY:number):void
        {
            this._moveIcon.pos(PosX - 47, PosY - 47);
        }
    }
}