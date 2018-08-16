var Global;
(function (Global) {
    var Const = /** @class */ (function () {
        function Const() {
        }
        // 游戏宽高
        Const.GAME_WIDTH = 1280;
        Const.GAME_HEIGHT = 720;
        // 地图尺寸
        Const.MAP_WIDTH = 5120;
        Const.MAP_HEIGHT = 5120;
        // 游戏最大/最小速度
        Const.MIN_SPEED = 8;
        Const.MAX_SPEED = 12;
        Const.ITEM_TYPE_STAR = "item_type_star";
        Const.ITEM_TYPE_SPEED = "item_type_speed";
        Const.ITEM_TYPE_FLY = "item_type_fly";
        // 血条/蓝条
        Const.BAR_TYPE_MP = "bar_type_mp";
        Const.BAR_TYPE_HP = "bar_type_hp";
        Const.PLAYER_STATE_RUN = "player_state_run";
        Const.PLAYER_STATE_FLY = "player_state_fly";
        Const.PLAYER_STATE_HERT = "player_state_hert";
        Const.PLAYER_STATE_JUMP = "player_state_jump";
        Const.PLAYER_STATE_DIE = "player_state_die";
        return Const;
    }());
    Global.Const = Const;
})(Global || (Global = {}));
//# sourceMappingURL=Const.js.map