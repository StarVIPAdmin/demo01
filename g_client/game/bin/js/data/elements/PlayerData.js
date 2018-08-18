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
        PlayerState[PlayerState["IDE"] = 1] = "IDE";
        PlayerState[PlayerState["ATTACK"] = 2] = "ATTACK";
        PlayerState[PlayerState["DEATH"] = 3] = "DEATH";
        // CARRY = 4,      // 搬运
        PlayerState[PlayerState["PROTECT"] = 5] = "PROTECT"; // 受保护
    })(PlayerState = Data.PlayerState || (Data.PlayerState = {}));
    /**
     * 玩家数据类
     */
    var PlayerData = /** @class */ (function (_super) {
        __extends(PlayerData, _super);
        function PlayerData() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // 状态（正常，死亡，搬运，攻击）
            _this.state = PlayerState.IDE;
            return _this;
        }
        PlayerData.prototype.init = function () {
            this.nick = "玩家" + this.id;
            this.bodyPath = Global.Path.PNG_PLAYER_1;
            this.level = 1;
            this.power = 100;
            this.attack = 10;
            this.walkSpeed = 3;
            this.powerSpeed = 0.05;
            this.collisionRadius = 45;
            this.width = 96;
            this.height = 96;
            this.score = 0;
            this.x = Math.random() * Global.Const.MAP_WIDTH;
            this.y = Math.random() * Global.Const.MAP_HEIGHT;
            this.curPower = this.totalPower;
        };
        Object.defineProperty(PlayerData.prototype, "powerDelta", {
            /** 体力自然回复增量 */
            get: function () {
                return this.totalPower * this.powerSpeed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "totalPower", {
            /** 总体力 */
            get: function () {
                return this.power * this.level;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerData.prototype, "curPower", {
            get: function () {
                return this._curPower;
            },
            set: function (Val) {
                if (Val < 0) {
                    this._curPower = 0;
                }
                else if (Val > this.totalPower) {
                    this._curPower = this.totalPower;
                }
                else {
                    this._curPower = Val;
                }
            },
            enumerable: true,
            configurable: true
        });
        return PlayerData;
    }(Data.BaseData));
    Data.PlayerData = PlayerData;
})(Data || (Data = {}));
//# sourceMappingURL=PlayerData.js.map