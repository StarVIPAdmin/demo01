module Game {
    import Sprite = Laya.Sprite;
    import Animation = Laya.Animation;
    import Text = Laya.Text;

    import PlayerData = Data.PlayerData;

    /**
     * 玩家类
     */
    export class Player extends Sprite 
    {   
        // 数据
        private _data:PlayerData;
        // 昵称
        private _name:Text;
        // 模型
        private _body:Sprite;

        get data():PlayerData
        {
            return this._data;
        }

        constructor() 
        {
            super();
            this._data = null;
            this._name = null;
            this._body = null;
            this.size(96, 96);
        }

        init():void 
        {
            this.initData();
            this.initUI();

            Laya.timer.frameLoop(1, this, this.onLoop);
        }

        initData():void 
        {
            this._data = new PlayerData();
            this._data.name = "玩家A";
        }

        initUI():void 
        {
            if (this._body == null) {
                this._body = ResMgr.instance.createSprite(Global.Path.PNG_PLAYER_1, 128, 128);
                this.addChild(this._body);
            }

            if (this._name == null) {
                this._name = ResMgr.instance.createText();
                this._name.align = "center";
                this._name.pos(this._body.width * 0.5 - this._name.width * 0.5, 0);
                this.addChild(this._name);
            }

            this._name.text = this.data.name;
        }

        onLoop():void 
        {
            // 判定玩家是否死亡
            // if (this.y > (Global.Const.GAME_HEIGHT + 100)) {
            //     this.event(Global.Const.PLAYER_STATE_DIE, this);
            //     return;
            // }
        }

        gotoRun():void 
        {
            // this.playAction(Global.Const.PLAYER_STATE_RUN);
        }

        // 从场景移除（返回对象池）
        remove():void 
        {

        }

        // 销毁对象
        destroy():void 
        {

        }
    }
}