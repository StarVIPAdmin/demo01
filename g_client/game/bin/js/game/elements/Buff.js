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
    var Sprite = Laya.Sprite;
    /**
     * 药剂buff
     */
    var Buff = /** @class */ (function (_super) {
        __extends(Buff, _super);
        function Buff() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Buff.prototype, "data", {
            get: function () {
                return Game.DataMgr.instance.getBuffData(this.id);
            },
            enumerable: true,
            configurable: true
        });
        /** 重写父类函数 */
        Buff.prototype.init = function () {
            _super.prototype.init.call(this);
        };
        /** 重写父类函数 */
        Buff.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        return Buff;
    }(Game.BaseElement));
    /**
     * 药剂buff容器（管理场景buff）
     */
    var BuffContainer = /** @class */ (function (_super) {
        __extends(BuffContainer, _super);
        function BuffContainer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BuffContainer.prototype.init = function () {
            this._buffList = [];
        };
        /** 创建buff */
        BuffContainer.prototype.createBuff = function (id) {
            var buff = new Buff(id);
            buff.init();
            return buff;
        };
        /** 重置buff */
        BuffContainer.prototype.resetBuff = function () {
            var _this = this;
            // 清理旧数据
            this.clearBuff();
            var dataList = Game.DataMgr.instance.buffDataList;
            if (dataList == null || dataList.length == 0) {
                return;
            }
            dataList.forEach(function (data) {
                var buff = _this.createBuff(data.id);
                _this.addChild(buff);
                _this._buffList[data.id] = buff;
            });
        };
        /** 根据唯一ID，增加指定buff */
        BuffContainer.prototype.addBuff = function (id) {
            if (this.checkBuff(id)) {
                return;
            }
            var buff = this.createBuff(id);
            this.addChild(buff);
            this._buffList[id] = buff;
        };
        /** 根据唯一ID，移除指定buff */
        BuffContainer.prototype.removeBuff = function (id) {
            if (!this.checkBuff(id))
                return;
            var buff = this._buffList[id];
            buff.destroy();
            this._buffList[id] = null;
        };
        /** 清除buff */
        BuffContainer.prototype.clearBuff = function () {
            if (!this.checkBuffList())
                return;
            this._buffList.forEach(function (item) {
                item.destroy();
            });
            this._buffList = [];
        };
        /** 检测buff列表是否有数据 */
        BuffContainer.prototype.checkBuffList = function () {
            return !(this._buffList == null || this._buffList.length == 0);
        };
        /** 根据唯一ID，检测buff是否存在 */
        BuffContainer.prototype.checkBuff = function (id) {
            if (!this.checkBuffList()) {
                return false;
            }
            return this._buffList[id] != null;
        };
        return BuffContainer;
    }(Sprite));
    Game.BuffContainer = BuffContainer;
})(Game || (Game = {}));
//# sourceMappingURL=Buff.js.map