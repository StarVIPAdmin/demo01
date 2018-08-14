module Game {
    import Sprite = Laya.Sprite;

    /**
     * 玩家类
     */
    class Player extends BaseElement 
    {   
        get data():Data.PlayerData
        {
            if (this.id == Data.myPlayerData.id) {
                return Data.myPlayerData;
            } else {
                return Data.playerDataList[this.id];
            }
        }

        /** 重写父类函数 */
        init():void 
        {
            this.size(96, 96);
            super.init();

            Laya.timer.frameLoop(1, this, this.onLoop);
        }

        /** 重写父类函数 */
        destroy():void 
        {
            super.destroy();
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
        }

        // 从场景移除（返回对象池）
        remove():void 
        {
        }
    }

    /**
     * 玩家类容器
     */
    export class PlayerContainer extends Sprite
    {
        private _myPlayer:Player;

        // 玩家列表
        private _playerList:Array<Player>;

        get myPlayer():Player
        {
            return this._myPlayer;
        }

        init():void 
        {
            this._playerList = [];
        }

        createMyPlayer():void
        {
            this._myPlayer = this.createPlayer(99);
            this._myPlayer.pos(Global.Const.GAME_WIDTH * 0.5, Global.Const.GAME_HEIGHT * 0.5);
            // this._myPlayer.on(Global.Const.PLAYER_STATE_DIE, this, this.playerDie);
            this.addChild(this._myPlayer);
        }

        createPlayer(id:number):Player
        {
            let player = new Player(id);
            player.init();
            return player;
        }

        addPlayer():void 
        {
            // let player:Player;
            for (var i = 0; i < 4; i++) 
            {
                let player = this.createPlayer(i);
                player.pos(i * 200, i * 200);
                this.addChild(player);
                this._playerList[i] = player;
            }
        }

        removePlayer(id:number):void 
        {
            let player = this._playerList[id];
            player.destroy();
            this._playerList[id] = null;
        }

        clearPlayer():void 
        {
            this._playerList.forEach(item => {
                item.destroy();
            });

            this._playerList = [];
        }
    }
}