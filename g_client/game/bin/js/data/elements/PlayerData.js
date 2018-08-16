var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
    var PlayerData = /** @class */ (function (_super) {
        __extends(PlayerData, _super);
        function PlayerData() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // 状态（正常，死亡，搬运，攻击）
            _this.state = PlayerState.WALK;
            return _this;
        }
        PlayerData.prototype.init = function () {
            this.nick = "玩家" + this.id;
            this.bodyPath = Global.Path.PNG_PLAYER_1;
            this.power = 100;
            this.attack = 10;
            this.speed = 10;
            this.collisionRadius = 90;
            this.width = 96;
            this.height = 96;
            this.x = Math.random() * Global.Const.MAP_WIDTH;
            this.y = Math.random() * Global.Const.MAP_HEIGHT;
        };
        return PlayerData;
    }(Data.BaseData));
    Data.PlayerData = PlayerData;
})(Data || (Data = {}));
//# sourceMappingURL=PlayerData.js.map