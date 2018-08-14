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
    var Button = Laya.Button;
    var Sprite = Laya.Sprite;
    /**
     * 资源管理类
     */
    var ResMgr = /** @class */ (function (_super) {
        __extends(ResMgr, _super);
        function ResMgr() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ResMgr, "instance", {
            /** 获取单例实例 */
            get: function () {
                return _super.getInstanceOrCreate.call(this, ResMgr);
            },
            enumerable: true,
            configurable: true
        });
        /** 重写父类函数 */
        ResMgr.prototype.onCreate = function () {
        };
        /** 重写父类函数 */
        ResMgr.prototype.onDestroy = function () {
        };
        // 创建按钮
        ResMgr.prototype.createButton = function (skinPath) {
            var btn = new Button(skinPath);
            btn.autoSize = true;
            btn.anchorX = 0.5;
            btn.anchorY = 0.5;
            return btn;
        };
        // 创建文本
        ResMgr.prototype.createText = function () {
            var txt = new Text();
            txt.fontSize = 20;
            txt.color = "#ffffff";
            txt.text = "";
            txt.align = "left";
            txt.size(100, 100).pos(0, 0);
            return txt;
        };
        // 创建图片
        ResMgr.prototype.createSprite = function (url, width, height, xPos, yPos) {
            if (xPos === void 0) { xPos = 0; }
            if (yPos === void 0) { yPos = 0; }
            var spr = new Sprite();
            spr.graphics.clear();
            spr.graphics.drawTexture(Laya.loader.getRes(url), 0, 0, width, height);
            spr.size(width, height).pos(xPos, yPos);
            return spr;
        };
        return ResMgr;
    }(Core.BaseSingleton));
    Game.ResMgr = ResMgr;
})(Game || (Game = {}));
//# sourceMappingURL=ResMgr.js.map