module Data {
    /**
     * 玩家状态
     */
    export enum PlayerState {
        WALK = 1,       // 行走
        ATTACK = 2,     // 攻击
        DEATH = 3,      // 死亡
        CARRY = 4       // 搬运
    }

    /**
     * 玩家数据类
     */
    export class PlayerData extends BaseData
    {
        // 状态（正常，死亡，搬运，攻击）
        public state:number = PlayerState.WALK;
        // 体力
        public power:number;
        // 攻击力
        public attack:number;
        // 速度
        public speed:number;

        init():void 
        {
            this.nick = "玩家"+this.id;
            this.bodyPath = Global.Path.PNG_PLAYER_1;

            this.power = 100;
            this.attack = 10;
            this.speed = 10;

            this.width = 96;
            this.height = 96;
            this.x = Math.random() * 5120;
            this.y = Math.random() * 5120;
        }
    }
}