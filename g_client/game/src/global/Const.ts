module Global {
    export class Const 
    {
        // 游戏宽高
        public static readonly GAME_WIDTH:number = 1280;
        public static readonly GAME_HEIGHT:number = 720;

        // 游戏最大/最小速度
        public static readonly MIN_SPEED:number = 8;
        public static readonly MAX_SPEED:number = 12;

        public static readonly ITEM_TYPE_STAR:string = "item_type_star";
        public static readonly ITEM_TYPE_SPEED:string = "item_type_speed";
        public static readonly ITEM_TYPE_FLY:string = "item_type_fly";

        // 血条/蓝条
        public static readonly BAR_TYPE_MP:string = "bar_type_mp";
        public static readonly BAR_TYPE_HP:string = "bar_type_hp";

        public static readonly PLAYER_STATE_RUN:string = "player_state_run";
        public static readonly PLAYER_STATE_FLY:string = "player_state_fly";
        public static readonly PLAYER_STATE_HERT:string = "player_state_hert";
        public static readonly PLAYER_STATE_JUMP:string = "player_state_jump";
        public static readonly PLAYER_STATE_DIE:string = "player_state_die";
    }
}