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
    }
}