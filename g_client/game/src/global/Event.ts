module Global {
    export class Event
    {
        // 设置搬运图标显示状态
        public static readonly SET_CARRY_ICON_VISIBLE:string = "SET_CARRY_ICON_VISIBLE";
        // 玩家获得一个buff
        public static readonly GET_BUFF:string = "GET_BUFF";
        // 处在回收点
        public static readonly IN_RECYCLE_AREA:string = "IN_RECYCLE_AREA";
        // 游戏结束
        public static readonly GAME_OVER:string = "GAME_OVER";
        // 搬运食物
        public static readonly CARRY_FOOD:string = "CARRY_FOOD";
        // 丢弃食物
        public static readonly DROPOUT_FOOD:string = "DROPOUT_FOOD";
        // 更新体力
        public static readonly ON_UPDATE_POWER:string = "ON_UPDATE_POWER";
        // 回收食物
        public static readonly RECYCLE_FOOD:string = "RECYCLE_FOOD";
        // 重置食物
        public static readonly RESET_FOOD:string = "RESET_FOOD";
        // 改变玩家搬运食物ID
        public static readonly CHANGE_PLAYER_FOOD_ID:string = "CHANGE_PLAYER_FOOD_ID";
        // 改变玩家属性
        public static readonly CHANGE_PLAYER_ATTR:string = "CHANGE_PLAYER_ATTR";
    }
}