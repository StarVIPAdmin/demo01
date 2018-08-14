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
     * 食物类型
     */
    var FoodType;
    (function (FoodType) {
        FoodType[FoodType["BOTANY"] = 1] = "BOTANY";
        FoodType[FoodType["ANIMAL"] = 2] = "ANIMAL"; // 动物
    })(FoodType = Data.FoodType || (Data.FoodType = {}));
    /**
     * 食物数据类
     */
    var FoodData = /** @class */ (function (_super) {
        __extends(FoodData, _super);
        function FoodData() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // 类型（默认是植物）
            _this.type = FoodType.BOTANY;
            return _this;
        }
        FoodData.prototype.init = function () {
            this.nick = "食物" + this.id;
            this.bodyPath = Global.Path.PNG_ITEM_1;
            this.weight = 10;
            this.cfgId = 1;
            if (this.type == FoodType.BOTANY) {
                this.attack = 0;
            }
            else {
                this.attack = 10;
            }
        };
        return FoodData;
    }(Data.BaseData));
    Data.FoodData = FoodData;
})(Data || (Data = {}));
//# sourceMappingURL=FoodData.js.map