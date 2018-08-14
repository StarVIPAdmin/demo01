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
                return Data.buffDataList[this.id];
            },
            enumerable: true,
            configurable: true
        });
        /** 重写父类函数 */
        Buff.prototype.init = function () {
            this.size(512, 512);
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
        BuffContainer.prototype.createBuff = function (id) {
            var buff = new Buff(id);
            buff.init();
            return buff;
        };
        BuffContainer.prototype.addBuff = function () {
            var buff;
            for (var i = 0; i < 5; i++) {
                buff = this.createBuff(i);
                this._buffList[i] = buff;
            }
        };
        BuffContainer.prototype.removeBuff = function (id) {
            var buff = this._buffList[id];
            buff.destroy();
            this._buffList[id] = null;
        };
        BuffContainer.prototype.clearBuff = function () {
            this._buffList.forEach(function (buff) {
                buff.destroy();
            });
            this._buffList = [];
        };
        return BuffContainer;
    }(Sprite));
    Game.BuffContainer = BuffContainer;
})(Game || (Game = {}));
//# sourceMappingURL=Buff.js.map