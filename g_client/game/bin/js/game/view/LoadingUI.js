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
    var Text = Laya.Text;
    /**
    * loading类
    */
    var LoadingUI = /** @class */ (function (_super) {
        __extends(LoadingUI, _super);
        function LoadingUI() {
            var _this = _super.call(this) || this;
            _this.onLoaded = function () {
                if (_this._loadedFunc) {
                    _this._loadedFunc();
                    _this._loadedFunc = null;
                }
                _this.removeSelf();
            };
            _this.onLoading = function (Progress) {
                _this._txt.text = "Loading " + Math.floor(Progress * 100) + "%";
            };
            _this._bg = null;
            _this._txt = null;
            _this.onInit();
            return _this;
        }
        LoadingUI.prototype.onInit = function () {
            //黑色背景
            this._bg = new Sprite();
            this._bg.graphics.drawRect(0, 0, Global.Const.GAME_WIDTH, Global.Const.GAME_HEIGHT, "#000000");
            this.addChild(this._bg);
            //loading文本
            this._txt = new Text();
            this._txt.color = "#ffffff";
            this._txt.fontSize = 30;
            this._txt.text = "Loading";
            this._txt.width = Global.Const.GAME_WIDTH;
            this._txt.align = "center";
            this._txt.y = (Global.Const.GAME_WIDTH - this._txt.height) * 0.5;
            this.addChild(this._txt);
        };
        LoadingUI.prototype.onShow = function (Url, LoadedFunc) {
            this._loadedFunc = LoadedFunc;
            this._txt.text = "0%";
            Game.loaderMgr.loadRes(Url, this.onLoaded, this.onLoading);
            Core.LayerMgr.getInstance().addChildToDialog(this);
        };
        return LoadingUI;
    }(Sprite));
    Game.LoadingUI = LoadingUI;
})(Game || (Game = {}));
//# sourceMappingURL=LoadingUI.js.map