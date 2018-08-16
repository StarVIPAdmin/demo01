module Game {
    import Sprite = Laya.Sprite;

    // 玩家类标识（用于对象池回收）
    export const PLAYER_CLASS_SIGN:string = "player";

    /**
     * 玩家类
     */
    export class Player extends BaseElement 
    {   
        get data():Data.PlayerData
        {
            return DataMgr.instance.getPlayerData(this.id);
        }

        /** 重写父类函数 */
        init(id:number):void 
        {
            super.init(id);

            // Laya.timer.frameLoop(1, this, this.onLoop);
        }

        /** 重写父类函数 */
        destroy():void 
        {
            super.destroy();
            Laya.Pool.recover(PLAYER_CLASS_SIGN, this);
        }

        onLoop():void 
        {
            // 判定玩家是否死亡
            // if (this.y > (Global.Const.GAME_HEIGHT + 100)) {
            //     this.event(Global.Const.PLAYER_STATE_DIE, this);
            //     return;
            // }
        }
        
        /** 从场景移除（返回对象池） */
        remove():void 
        {
        }
    }

    /**
     * 玩家类容器
     */
    export class PlayerContainer extends Sprite
    {
        // 父容器
        private _mapContainer:MapContainer;
        // 玩家列表
        private _playerList:Array<Player>;

        init(parentContainer:MapContainer):void 
        {
            this._mapContainer = parentContainer;
            this._playerList = [];
        }

        /** 重置玩家 */
        resetPlayer():void 
        {
            // 清理旧数据
            this.clearPlayer();

            let dataList = DataMgr.instance.otherPlayerData;
            if (dataList == null || dataList.length == 0) {
                return;
            }

            dataList.forEach(data => {
                let player = ResMgr.instance.createPlayer(data.id);
                this.addChild(player);
                this._playerList[data.id] = player;
            });
        }

        /** 根据唯一ID，增加指定玩家 */
        addPlayer(id:number):void 
        {
            if (this.checkPlayer(id)) {
                return;
            }

            let player = ResMgr.instance.createPlayer(id);
            this.addChild(player);
            this._playerList[id] = player;
        }

        /** 根据唯一ID，移除指定玩家 */
        removePlayer(id:number):void 
        {
            if (!this.checkPlayer(id))
                return;

            let player = this._playerList[id];
            player.destroy();
            this._playerList[id] = null;
        }

        /** 清除玩家 */
        clearPlayer():void 
        {
            if (!this.checkPlayerList())
                return;

            this._playerList.forEach(item => {
                item.destroy();
            });
            this._playerList = [];
        }

        /** 检测玩家列表是否有数据 */
        checkPlayerList():boolean 
        {
            return !(this._playerList == null || this._playerList.length == 0)
        }

        /** 根据唯一ID，检测玩家是否存在 */
        checkPlayer(id:number):boolean 
        {
            if (!this.checkPlayerList()) {
                return false;
            }
            return this._playerList[id] != null
        }
    }
}