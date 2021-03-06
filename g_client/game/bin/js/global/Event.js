var Global;
(function (Global) {
    var Event = /** @class */ (function () {
        function Event() {
        }
        // 设置搬运图标显示状态
        Event.SET_CARRY_ICON_VISIBLE = "SET_CARRY_ICON_VISIBLE";
        // 玩家获得一个buff
        Event.GET_BUFF = "GET_BUFF";
        // 处在回收点
        Event.IN_RECYCLE_AREA = "IN_RECYCLE_AREA";
        // 游戏结束
        Event.GAME_OVER = "GAME_OVER";
        // 搬运食物
        Event.CARRY_FOOD = "CARRY_FOOD";
        // 丢弃食物
        Event.DROPOUT_FOOD = "DROPOUT_FOOD";
        // 更新体力
        Event.ON_UPDATE_POWER = "ON_UPDATE_POWER";
        // 回收食物
        Event.RECYCLE_FOOD = "RECYCLE_FOOD";
        // 重置食物
        Event.RESET_FOOD = "RESET_FOOD";
        // 改变玩家搬运食物ID
        Event.CHANGE_PLAYER_FOOD_ID = "CHANGE_PLAYER_FOOD_ID";
        // 改变玩家属性
        Event.CHANGE_PLAYER_ATTR = "CHANGE_PLAYER_ATTR";
        return Event;
    }());
    Global.Event = Event;
})(Global || (Global = {}));
//# sourceMappingURL=Event.js.map