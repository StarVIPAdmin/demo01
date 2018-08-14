var Data;
(function (Data) {
    /**
     * 基础数据
     */
    var BaseData = /** @class */ (function () {
        function BaseData(id) {
            /** 昵称 */
            this.nick = "";
            /** 图标路径 */
            this.bodyPath = "";
            this.id = id;
        }
        return BaseData;
    }());
    Data.BaseData = BaseData;
})(Data || (Data = {}));
//# sourceMappingURL=BaseData.js.map