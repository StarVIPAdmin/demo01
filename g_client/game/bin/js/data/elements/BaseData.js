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
            /** x/y坐标 */
            this.x = 0;
            this.y = 0;
            /** 长宽 */
            this.width = 1;
            this.height = 1;
            this.id = id;
        }
        return BaseData;
    }());
    Data.BaseData = BaseData;
})(Data || (Data = {}));
//# sourceMappingURL=BaseData.js.map