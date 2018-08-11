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
var Game;
(function (Game) {
    var Text = Laya.Text;
    /**
     * 资源管理类
     */
    var ResMgr = /** @class */ (function (_super) {
        __extends(ResMgr, _super);
        function ResMgr() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** 获取单例实例 */
        ResMgr.getInstance = function () {
            return Core.BaseSingleton.getInstanceOrCreate(ResMgr);
        };
        /** 重写父类函数 */
        ResMgr.prototype.onCreate = function () {
        };
        /** 重写父类函数 */
        ResMgr.prototype.onDestroy = function () {
        };
        ResMgr.prototype.createText = function () {
            var txt = new Text();
            txt.fontSize = 20;
            txt.color = "#ffffff";
            txt.text = "";
            txt.align = "left";
            txt.pos(0, 0);
            txt.size(100, 100);
            return txt;
        };
        return ResMgr;
    }(Core.BaseSingleton));
    Game.ResMgr = ResMgr;
})(Game || (Game = {}));
//# sourceMappingURL=ResMgr.js.map