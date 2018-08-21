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
/**
 * 积分配置表
 */
var ScoreCfg = /** @class */ (function (_super) {
    __extends(ScoreCfg, _super);
    function ScoreCfg() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ScoreCfg, "name", {
        /** 重写父类函数 */
        get: function () {
            return "score_cfg";
        },
        enumerable: true,
        configurable: true
    });
    ScoreCfg.checkLevelByScore = function (score) {
        var scoreCfg = this._data.ScoreCfg;
        var len = scoreCfg.length;
        for (var i = 0; i < len; i++) {
            if (score < scoreCfg[i]) {
                return i + 1;
            }
        }
        return len;
    };
    return ScoreCfg;
}(BaseCfg));
//# sourceMappingURL=ScoreCfg.js.map