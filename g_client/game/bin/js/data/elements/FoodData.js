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
    /** 食物类型 */
    var FoodType;
    (function (FoodType) {
        FoodType[FoodType["BOTANY"] = 1] = "BOTANY";
        FoodType[FoodType["ANIMAL"] = 2] = "ANIMAL"; // 动物
    })(FoodType = Data.FoodType || (Data.FoodType = {}));
    /** 食物状态 */
    var FoodState;
    (function (FoodState) {
        FoodState[FoodState["LIVE"] = 1] = "LIVE";
        FoodState[FoodState["DEATH"] = 2] = "DEATH";
        FoodState[FoodState["CARRY"] = 3] = "CARRY"; // 搬运状态
    })(FoodState = Data.FoodState || (Data.FoodState = {}));
    /**
     * 食物数据类
     */
    var FoodData = /** @class */ (function (_super) {
        __extends(FoodData, _super);
        function FoodData() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // 位置索引
            _this.posIdx = 0;
            // 类型（默认是植物）
            _this._type = FoodType.BOTANY;
            return _this;
        }
        FoodData.prototype.init = function (cfgId) {
            this.cfgId = cfgId;
            this.state = FoodState.LIVE;
            this.collisionRadius = 60;
            this.width = 128;
            this.height = 128;
        };
        Object.defineProperty(FoodData.prototype, "cfgId", {
            get: function () {
                return this._cfgId;
            },
            set: function (cfgId) {
                if (this._cfgId == cfgId) {
                    return;
                }
                this._cfgId = cfgId;
                var cfg = ElementCfg.getFoodCfg(cfgId);
                this.nick = cfg.Name;
                this.bodyPath = Global.Path.FOOD_PATH + cfg.ResName + ".png";
                this._weight = cfg.Weight;
                this._score = cfg.Score;
                this._attack = cfg.Attack;
                this._type = cfg.Type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FoodData.prototype, "type", {
            get: function () {
                return this._cfgId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FoodData.prototype, "weight", {
            get: function () {
                return this._weight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FoodData.prototype, "attack", {
            get: function () {
                return this._attack;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FoodData.prototype, "score", {
            get: function () {
                return this._score;
            },
            enumerable: true,
            configurable: true
        });
        return FoodData;
    }(Data.BaseData));
    Data.FoodData = FoodData;
})(Data || (Data = {}));
//# sourceMappingURL=FoodData.js.map