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
var Core;
(function (Core) {
    var Sprite = Laya.Sprite;
    /**
     * 层级管理器
     */
    var LayerMgr = /** @class */ (function (_super) {
        __extends(LayerMgr, _super);
        function LayerMgr() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** 获取单例实例 */
        LayerMgr.getInstance = function () {
            return Core.BaseSingleton.getInstanceOrCreate(LayerMgr);
        };
        LayerMgr.prototype.onCreate = function () {
            this._layerNode = [];
            this._layerIdx = [0 /* Scene */, 1 /* Dialog */, 2 /* Tip */, 3 /* Guide */];
            this.initLayerNode();
        };
        LayerMgr.prototype.onDestroy = function () {
        };
        /** 把显示对象添加到场景层 */
        LayerMgr.prototype.addChildToScene = function (Child, PosX, PosY) {
            this.addChildToLayer(0 /* Scene */, Child, PosX, PosY);
        };
        /** 把显示对象添加到弹框层(UI) */
        LayerMgr.prototype.addChildToDialog = function (Child, PosX, PosY) {
            this.addChildToLayer(1 /* Dialog */, Child, PosX, PosY);
        };
        /** 把显示对象添加到提示层 */
        LayerMgr.prototype.addChildToTip = function (Child, PosX, PosY) {
            this.addChildToLayer(2 /* Tip */, Child, PosX, PosY);
        };
        /** 把显示对象添加到引导层 */
        LayerMgr.prototype.addChildToGuide = function (Child, PosX, PosY) {
            this.addChildToLayer(3 /* Guide */, Child, PosX, PosY);
        };
        LayerMgr.prototype.initLayerNode = function () {
            var _this = this;
            var node;
            this._layerIdx.forEach(function (element) {
                node = new Sprite();
                Laya.stage.addChildAt(node, element);
                _this._layerNode[element] = node;
            });
        };
        /** 添加显示对象到对应的层级 */
        LayerMgr.prototype.addChildToLayer = function (LayerIdx, Child, PosX, PosY) {
            if (!Child) {
                console.log("[LayerMgr] addChildToLayer : Child is null");
                return;
            }
            var layer = this._layerNode[LayerIdx];
            if (layer == null) {
                console.log("[LayerMgr] addChildToLayer : LayerNode(${LayerIdx}) is not exist");
                return;
            }
            Child.removeSelf();
            Child.x = PosX || 0;
            Child.y = PosY || 0;
            layer.addChild(Child);
        };
        return LayerMgr;
    }(Core.BaseSingleton));
    Core.LayerMgr = LayerMgr;
})(Core || (Core = {}));
//# sourceMappingURL=LayerMgr.js.map