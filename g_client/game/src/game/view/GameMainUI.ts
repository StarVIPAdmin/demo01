module Game {
    import Sprite = Laya.Sprite;
    import Text = Laya.Text;
    import Event = Laya.Event;

    /**
     * 游戏主UI
     */
    export class GameMainUI extends Sprite 
    {
        // 摇杆半径/长/宽
        private readonly MOVE_BG_RADIUS:number = 80;
        private readonly MOVE_BG_WIDTH:number = 222;
        private readonly MOVE_BG_HEIGHT:number = 222;
        private readonly MOVE_ICON_WIDTH:number = 95;
        private readonly MOVE_ICON_HEIGHT:number = 95;

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

        private _dropoutIcon:Sprite;
        private _carryIcon:Sprite;

        private _carryFoodId:number;

        // 是否可以移动摇杆
        private _canMove:boolean;

        // 摇杆尺寸的一半
        private _halfMoveBGWidth:number;
        private _halfMoveBGHeight:number;
        private _halfMoveIconWidth:number;
        private _halfMoveIconHeight:number;

        constructor() 
        {
            super();
            this.initData();
            this.initUI();
            this.initEvent();
        }

        initData():void
        {
            this._powerBar = null;
            this._attack = null;
            this._speed = null;
            this._score = null;
            this._moveBG = null;
            this._moveIcon = null;
            this._canMove = false;
            this._halfMoveBGWidth = this.MOVE_BG_WIDTH * 0.5;
            this._halfMoveBGHeight = this.MOVE_BG_HEIGHT * 0.5;
            this._halfMoveIconWidth = this.MOVE_ICON_WIDTH * 0.5;
            this._halfMoveIconHeight = this.MOVE_ICON_HEIGHT * 0.5;
        }

        initUI():void 
        {
            this._powerBar = new ProgressBar();
            this._powerBar.init();
            this._powerBar.pos(10, 7);
            this.addChild(this._powerBar);

            this._attack = ResMgr.instance.createText();
            this._attack.pos(10, 37);
            this.addChild(this._attack);

            this._speed = ResMgr.instance.createText();
            this._speed.pos(120, 37);
            this.addChild(this._speed);

            this._score = ResMgr.instance.createText();
            this._score.align = "right";
            this._score.pos(Global.Const.GAME_WIDTH - 120, 7);
            this.addChild(this._score);

            this._moveBG = new Sprite();
            this._moveBG.graphics.clear();
            this.addChild(this._moveBG);
            this._moveBG.graphics.drawTexture(Laya.loader.getRes(Global.Path.PNG_COMBAT_MOVE_BG),0,0,this.MOVE_BG_WIDTH,this.MOVE_BG_HEIGHT);
            this._moveBG.size(this.MOVE_BG_WIDTH,this.MOVE_BG_HEIGHT).pos(30,Global.Const.GAME_HEIGHT-this.MOVE_BG_HEIGHT-30);

            this._moveIcon = new Sprite();
            this._moveIcon.graphics.clear();
            this._moveBG.addChild(this._moveIcon);
            this._moveIcon.graphics.drawTexture(Laya.loader.getRes(Global.Path.PNG_COMBAT_MOVE_ICON),0,0,this.MOVE_ICON_WIDTH,this.MOVE_ICON_HEIGHT);
            this.setMoveIconPos(this._halfMoveBGWidth, this._halfMoveBGHeight);

            this._carryIcon = ResMgr.instance.createSprite(Global.Path.PNG_CARRY_ICON, 204, 204);
            this._carryIcon.pos(Global.Const.GAME_WIDTH - 234, Global.Const.GAME_HEIGHT - 234).visible = false;
            this.addChild(this._carryIcon);
            
            this._dropoutIcon = ResMgr.instance.createSprite(Global.Path.PNG_DROPOUT_ICON, 204, 204);
            this._dropoutIcon.pos(Global.Const.GAME_WIDTH - 234, Global.Const.GAME_HEIGHT - 234).visible = false;
            this.addChild(this._dropoutIcon);
        }

        initEvent():void 
        {
            this._carryIcon.on(Event.MOUSE_UP, this, this.onClickCarryIcon);
            this._dropoutIcon.on(Event.MOUSE_UP, this, this.onClickDropoutIcon);
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
            this._canMove = false;
            this._moveBG.alpha = 1;
            this.setMoveIconPos(this._halfMoveBGWidth, this._halfMoveBGHeight);
        }

        onMouseDown(evt:Event):void 
        {
            let mouseX = Laya.stage.mouseX;
            let mouseY = Laya.stage.mouseY;
            this._canMove = this._moveBG.hitTestPoint(mouseX, mouseY);

            if (this._canMove) {
                this._moveBG.alpha = 0.6;
                this.refreshMoveIconPos();
            }
        }

        onMouseMove(evt:Event):void 
        {
            if (this._canMove) {
                this.refreshMoveIconPos();
            }
        }
        
        // 更新摇杆坐标
        refreshMoveIconPos():void 
        {
            let initPosx = this._moveBG.x + this._halfMoveBGWidth;
            let initPosy = this._moveBG.y + this._halfMoveBGHeight;
            let touchPosx = Laya.stage.mouseX;
            let touchPosy = Laya.stage.mouseY;
            let deltaPosx = touchPosx - initPosx;
            let deltaPosy = touchPosy - initPosy;
            let distance = Math.sqrt(deltaPosx * deltaPosx + deltaPosy * deltaPosy);

            if (distance > this.MOVE_BG_RADIUS) {
                let targetPosx = this.MOVE_BG_RADIUS * deltaPosx / distance + this._halfMoveBGWidth; 
                let targetPosy = this.MOVE_BG_RADIUS * deltaPosy / distance + this._halfMoveBGHeight;
                this.setMoveIconPos(targetPosx, targetPosy);
            } else {
                this.setMoveIconPos(touchPosx - this._moveBG.x, touchPosy - this._moveBG.y);
            }
        }

        // 设置摇杆坐标
        setMoveIconPos(PosX:number, PosY:number):void
        {
            this._moveIcon.pos(PosX - this._halfMoveIconWidth, PosY - this._halfMoveIconHeight);
        }

        // 获取行走角度
        getMoveIconAngle():number
        {
            if (!this._canMove) 
                return 0;

            let moveIconPosX = this._moveIcon.x + this._halfMoveIconWidth;
            let moveIconPosY = this._moveIcon.y + this._halfMoveIconHeight;
            return Math.atan2(moveIconPosY - this._halfMoveBGHeight, moveIconPosX - this._halfMoveBGWidth);
        }

        /** 设置拾取按钮是否显示 */
        setCarryIconVisible(foodId:number):void 
        {
            this._carryFoodId = foodId;
            this._carryIcon.visible = foodId != 0;
        }

        /** 点击搬运按钮 */
        onClickCarryIcon():void 
        {
            if (this._carryFoodId != 0) {
                EventMgr.instance.event(Global.Event.CARRY_FOOD, [this._carryFoodId]);
            }
        }

        /** 点击丢弃按钮 */
        onClickDropoutIcon():void 
        {
            EventMgr.instance.event(Global.Event.DROPOUT_FOOD);
        }

        /** 设置丢弃按钮是否显示 */
        setDropoutIconVisible(bool:boolean):void 
        {
            this._dropoutIcon.visible = bool;
        }

        /** 刷新玩家体力 */
        refreshPlayerPower(percent:number):void 
        {
            this._powerBar.setValue(percent);
        }
    }
}