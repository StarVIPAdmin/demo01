var Global;
(function (Global) {
    var Event = /** @class */ (function () {
        function Event() {
        }
        Event.FOOD_GO_DIE = "FOOD_GO_DIE";
        // 玩家获得一个buff
        Event.GET_BUFF = "GET_BUFF";
        return Event;
    }());
    Global.Event = Event;
})(Global || (Global = {}));
//# sourceMappingURL=Event.js.map