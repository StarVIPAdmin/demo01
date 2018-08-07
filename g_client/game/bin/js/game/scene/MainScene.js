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
    var Point = Laya.Point;
    /**
     * 游戏主场景
     */
    var MainScene = /** @class */ (function (_super) {
        __extends(MainScene, _super);
        function MainScene() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainScene.prototype.onInit = function () {
            _super.prototype.onInit.call(this);
            this.sceneId = Global.SceneId.MAIN_SCENE;
            this._mainUI = null;
            this._mapFloor = null;
            this._score = 0;
            this._itemPoint = new Point();
            this.initUI();
            this.initEvent();
        };
        MainScene.prototype.onShow = function () {
            _super.prototype.onShow.call(this);
        };
        MainScene.prototype.initUI = function () {
            this._mapFloor = new Game.MapFloor();
            this.addChild(this._mapFloor);
            this._mainUI = new Game.GameMainUI();
            this.addChild(this._mainUI);
            this._player = new Game.Player();
            this._player.pos(0, 0);
            this._player.on(Global.Const.PLAYER_STATE_DIE, this, this.playerDie);
            this.addChild(this._player);
            // this._npcTime = new Date().getTime();
            // Laya.timer.frameLoop(1, this, this.onLoop);
        };
        MainScene.prototype.initEvent = function () {
            Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onKeyDown);
            Laya.stage.on(Laya.Event.KEY_UP, this, this.onKeyUp);
        };
        MainScene.prototype.onKeyDown = function (Evt) {
            var keyCode = Evt.keyCode;
            switch (keyCode) {
                case 65: // A
                    this._mapFloor.moveMap(true);
                    break;
                case 68: // D
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
        // onLoop():void 
        // {
        //     for (var i = this._mapFloor.numChildren - 1; i > -1; i--) {
        //         let floor = this._mapFloor.getChildAt(i) as Floor;
        //         if (floor.checkHit(this._player.x, this._player.y)) {
        //             let itemList = floor.getItems();
        //             for (var j = 0; j < itemList.length; j++) {
        //                 let item = itemList[j];
        //                 if (item.visible) {
        //                     this._itemPoint.x = item.x + floor.x + this._player.width;
        //                     this._itemPoint.y = item.y + floor.y + this._player.height;
        //                     if (this._player.hitTestPoint(this._itemPoint.x, this._itemPoint.y)) {
        //                         if (item.type == Global.Const.ITEM_TYPE_SPEED) {
        //                             item.visible = false;
        //                             // this._player.showEffect();
        //                         } else if (item.type == Global.Const.ITEM_TYPE_FLY) {
        //                             item.visible = false;
        //                             this._flyBar.changeValue(100);
        //                         } else {
        //                             Laya.Tween.to(item, {y:-10, scaleX:0.1, alpha:0}, 300, null, Laya.Handler.create(this, this.itemTweenComplete, [item]));
        //                             this.updateScore();
        //                         }
        //                     }
        //                 }
        //             }
        //             this._player.y = floor.y;
        //         }
        //     }
        //     let leftTime = new Date().getTime() - this._npcTime;
        //     if (leftTime > 1500) {
        //         this._npcTime = new Date().getTime();
        //         let npc = Laya.Pool.getItemByClass("npc", Npc);
        //         this.addChild(npc);
        //     }
        // }
        MainScene.prototype.itemTweenComplete = function (PItem) {
            PItem.visible = false;
            PItem.y = 0;
            PItem.alpha = 1;
            PItem.scale(1, 1);
        };
        MainScene.prototype.onMouseDown = function () {
        };
        MainScene.prototype.onMouseUp = function () {
            this._player.gotoJump();
        };
        MainScene.prototype.playerDie = function () {
            Data.isGameOver = true;
            Game.viewMgr.showView(Global.ViewId.GAME_OVER_UI, this._score);
        };
        MainScene.prototype.updateScore = function () {
            this._score++;
            this._mainUI.refreshScoreTxt(this._score);
        };
        return MainScene;
    }(Core.BaseScene));
    Game.MainScene = MainScene;
})(Game || (Game = {}));
//# sourceMappingURL=MainScene.js.map