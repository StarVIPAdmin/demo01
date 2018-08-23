module Data {

    /** 食物类型 */
    export enum FoodType 
    {
        BOTANY = 1,     // 植物
        ANIMAL = 2      // 动物
    }

    /** 食物状态 */
    export enum FoodState
    {
        LIVE = 1,       // 生存状态
        DEATH = 2,      // 死亡状态
        CARRY = 3       // 搬运状态
    }

    /**
     * 食物数据类
     */
    export class FoodData extends BaseData
    {
        // 状态
        public state:number;

        // 位置索引
        public posIdx:number = 0;

        // 配置ID
        private _cfgId:number;
        // 类型（默认是植物）
        private _type:number = FoodType.BOTANY;
        // 重量
        private _weight:number;
        // 攻击力
        private _attack:number;
        // 搬运完成后所提供的积分
        private _score:number;

        init(cfgId:number):void 
        {
            this.cfgId = cfgId;
            this.state = FoodState.LIVE;
            this.collisionRadius = 60;
            this.width = 128;
            this.height = 128;
        }

        get cfgId():number
        {
            return this._cfgId;
        }

        set cfgId(cfgId:number) 
        {
            if (this._cfgId == cfgId) {
                return;
            }
            this._cfgId = cfgId;
            let cfg = ElementCfg.getFoodCfg(cfgId);
            this.nick = cfg.Name;
            this.bodyPath = Global.Path.FOOD_PATH + cfg.ResName + ".png";
            this._weight = cfg.Weight;
            this._score = cfg.Score;
            this._attack = cfg.Attack;
            this._type = cfg.Type;
        }

        get type():number
        {
            return this._cfgId;
        }

        get weight():number
        {
            return this._weight;
        }

        get attack():number
        {
            return this._attack;
        }

        get score():number
        {
            return this._score;
        }
    }
}