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
    var Point = Laya.Point;
    /**
     * 游戏场景
     */
    var MainScene = /** @class */ (function (_super) {
        __extends(MainScene, _super);
        function MainScene() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainScene.prototype.onInit = function () {
            _super.prototype.onInit.call(this);
            this.sceneId = Global.SceneId.MAIN_SCENE;
            this._bgUI = null;
            this._mapFloor = null;
            this._flyBar = null;
            this._speedBar = null;
            this._scoreTxt = null;
            this._score = 0;
            this._itemPoint = new Point();
            this.initUI();
            this.initEvent();
        };
        MainScene.prototype.onShow = function () {
            _super.prototype.onShow.call(this);
        };
        MainScene.prototype.initUI = function () {
            this._bgUI = new Game.BackgroundUI();
            this.addChild(this._bgUI);
            this._mapFloor = new Game.MapFloor();
            this.addChild(this._mapFloor);
            this._flyBar = new Game.ProgressBar(Global.Const.BAR_TYPE_MP);
            this._flyBar.y = 7;
            this.addChild(this._flyBar);
            this._speedBar = new Game.ProgressBar(Global.Const.BAR_TYPE_HP);
            this._speedBar.y = 7 + this._speedBar.height + 4;
            this.addChild(this._speedBar);
            this._player = new Game.Player(this._flyBar, this._speedBar);
            this._player.x = 32 * 8;
            this._player.y = 32 * 4;
            this._player.on(Global.Const.PLAYER_STATE_DIE, this, this.playerDie);
            this.addChild(this._player);
            this._scoreTxt = new Text();
            this._scoreTxt.color = "#ffffff";
            this._scoreTxt.fontSize = 30;
            this._scoreTxt.text = "0";
            this._scoreTxt.width = Global.Const.GAME_WIDTH;
            this._scoreTxt.align = "right";
            this._scoreTxt.x = -10;
            this._scoreTxt.y = 10;
            this.addChild(this._scoreTxt);
            // this._npcTime = new Date().getTime();
            Laya.timer.frameLoop(1, this, this.onLoop);
        };
        MainScene.prototype.initEvent = function () {
            Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onKeyDown);
            Laya.stage.on(Laya.Event.KEY_UP, this, this.onKeyUp);
        };
        MainScene.prototype.onKeyDown = function (Evt) {
            var keyCode = Evt.keyCode;
            switch (keyCode) {
                case 65: // A
                    this._bgUI.move(false);
                    this._mapFloor.moveMap(true);
                    break;
                case 68: // D
                    this._bgUI.move(true);
                    this._mapFloor.moveMap(false);
                    break;
                case 83: // S
                    // this._bgUI.move();
                    break;
                case 87: // W
                    // this._bgUI.move();
                    this._player.gotoJump();
                    break;
                default:
                    break;
            }
        };
        MainScene.prototype.onKeyUp = function (Evt) {
        };
        MainScene.prototype.onLoop = function () {
            for (var i = this._mapFloor.numChildren - 1; i > -1; i--) {
                var floor = this._mapFloor.getChildAt(i);
                if (floor.checkHit(this._player.x, this._player.y)) {
                    var itemList = floor.getItems();
                    for (var j = 0; j < itemList.length; j++) {
                        var item = itemList[j];
                        if (item.visible) {
                            this._itemPoint.x = item.x + floor.x + this._player.width;
                            this._itemPoint.y = item.y + floor.y + this._player.height;
                            if (this._player.hitTestPoint(this._itemPoint.x, this._itemPoint.y)) {
                                if (item.type == Global.Const.ITEM_TYPE_SPEED) {
                                    item.visible = false;
                                    // this._player.showEffect();
                                }
                                else if (item.type == Global.Const.ITEM_TYPE_FLY) {
                                    item.visible = false;
                                    this._flyBar.changeValue(100);
                                }
                                else {
                                    Laya.Tween.to(item, { y: -10, scaleX: 0.1, alpha: 0 }, 300, null, Laya.Handler.create(this, this.itemTweenComplete, [item]));
                                    this.updateScore();
                                }
                            }
                        }
                    }
                    this._player.y = floor.y;
                    this._player.jumpReset();
                }
            }
            var leftTime = new Date().getTime() - this._npcTime;
            if (leftTime > 1500) {
                this._npcTime = new Date().getTime();
                var npc = Laya.Pool.getItemByClass("npc", Game.Npc);
                this.addChild(npc);
            }
        };
        MainScene.prototype.itemTweenComplete = function (PItem) {
            PItem.visible = false;
            PItem.y = 0;
            PItem.alpha = 1;
            PItem.scale(1, 1);
        };
        MainScene.prototype.onMouseDown = function () {
            this._player.doubleJump();
        };
        MainScene.prototype.onMouseUp = function () {
            this._player.gotoJump();
        };
        MainScene.prototype.playerDie = function () {
            Data.isOver = true;
            Game.viewMgr.showView(Global.ViewId.GAME_OVER_UI, this._score);
        };
        MainScene.prototype.updateScore = function () {
            this._score++;
            this._scoreTxt.text = this._score.toString();
        };
        return MainScene;
    }(Core.BaseScene));
    Game.MainScene = MainScene;
})(Game || (Game = {}));
//# sourceMappingURL=MainScene.js.map