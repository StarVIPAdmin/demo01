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
    var FoodData = /** @class */ (function () {
        function FoodData() {
            // 类型（默认是植物）
            this.type = FoodType.BOTANY;
            // 重量
            this.weight = 0;
            // 攻击力
            this.attack = 0;
        }
        return FoodData;
    }());
    Data.FoodData = FoodData;
})(Data || (Data = {}));
//# sourceMappingURL=FoodData.js.map