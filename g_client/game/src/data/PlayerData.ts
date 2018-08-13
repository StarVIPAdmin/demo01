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
    export class PlayerData
    {
        // 状态（正常，死亡，搬运，攻击）
        public state:number = PlayerState.WALK;
        // 体力
        public power:number = 100;
        // 攻击力
        public attack:number = 10;
        // 速度
        public speed:number = 2;
        // 名称
        public name:string = "头号玩家";
    }
}