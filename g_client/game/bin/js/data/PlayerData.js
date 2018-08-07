var Data;
(function (Data) {
    /**
     * 玩家状态
     */
    var PlayerState;
    (function (PlayerState) {
        PlayerState[PlayerState["WALK"] = 1] = "WALK";
        PlayerState[PlayerState["ATTACK"] = 2] = "ATTACK";
        PlayerState[PlayerState["DEATH"] = 3] = "DEATH";
        PlayerState[PlayerState["CARRY"] = 4] = "CARRY"; // 搬运
    })(PlayerState = Data.PlayerState || (Data.PlayerState = {}));
    /**
     * 玩家数据类
     */
    var PlayerData = /** @class */ (function () {
        function PlayerData() {
            // 状态（正常，死亡，搬运，攻击）
            this.state = PlayerState.WALK;
            // 体力
            this.power = 100;
            // 攻击力
            this.attack = 10;
            // 速度
            this.speed = 10;
        }
        return PlayerData;
    }());
    Data.PlayerData = PlayerData;
})(Data || (Data = {}));
//# sourceMappingURL=PlayerData.js.map