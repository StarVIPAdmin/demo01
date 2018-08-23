module Data {
    /**
     * 玩家状态
     */
    export enum PlayerState {
        IDE = 1,        // 正常
        ATTACK = 2,     // 攻击
        DEATH = 3,      // 死亡
        PROTECT = 4     // 受保护
    }

    /**
     * 玩家数据类
     */
    export class PlayerData extends BaseData
    {
        // 状态（正常，死亡，搬运，攻击）
        public state:number = PlayerState.IDE;
        // 体力
        public power:number;
        // 攻击力
        public attack:number;
        // 行走速度
        public walkSpeed:number;
        // 耐力变化速度（以秒为单位）
        public powerSpeed:number;
        // 等级
        public level:number;
        // 身上的食物ID（没有则为0）
        public foodId:number;
        // 积分
        public score:number;

        private _curPower:number;

        public x:number;
        public y:number;

        init():void 
        {
            let cfg = ElementCfg.getBuffCfg(1);
            this.nick = "玩家"+cfg.Name;
            this.bodyPath = Global.Path.PNG_PLAYER_1;

            this.foodId = 0;
            this.level = 1;
            this.power = 100;
            this.attack = 10;
            this.walkSpeed = 3;
            this.powerSpeed = 0.05;
            this.collisionRadius = 45;
            this.width = 96;
            this.height = 96;
            this.score = 0;
            this.x = Math.random() * Global.Const.MAP_WIDTH;
            this.y = Math.random() * Global.Const.MAP_HEIGHT;

            this._curPower = this.totalPower;
        }

        /** 体力自然回复增量 */
        get powerDelta():number
        {
            return this.totalPower * this.powerSpeed;
        }
        
        /** 总体力 */
        get totalPower():number
        {
            return this.power * this.level;
        }

        set curPower(Val:number)
        {
            if (Val < 0) {
                this._curPower = 0;
            } else if (Val > this.totalPower) {
                this._curPower = this.totalPower;
            } else {
                this._curPower = Val;
            }
        }

        get curPower():number
        {
            return this._curPower;
        }
    }
}