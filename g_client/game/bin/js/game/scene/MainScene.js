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
    var Event = Laya.Event;
    /**
     * 游戏主场景
     */
    var MainScene = /** @class */ (function (_super) {
        __extends(MainScene, _super);
        function MainScene() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(MainScene.prototype, "sceneData", {
            /** 重写父类函数 */
            get: function () {
                return this.__sceneData;
            },
            enumerable: true,
            configurable: true
        });
        /** 重写父类函数 */
        MainScene.prototype.onInit = function () {
            _super.prototype.onInit.call(this);
            this._mainUI = null;
            this._mapContainer = null;
            this._player = null;
            this.initUI();
        };
        /** 重写父类函数 */
        MainScene.prototype.onShow = function () {
            _super.prototype.onShow.call(this);
            this._player = Game.ResMgr.instance.createPlayer(Game.DataMgr.instance.myPlayerData.id);
            this.addChild(this._player);
            this._mapContainer.resetElements();
            this._mainUI.refreshAttackTxt(Game.DataMgr.instance.myPlayerData.attack);
            this._mainUI.refreshSpeedTxt(Game.DataMgr.instance.myPlayerData.walkSpeed);
            this._mainUI.refreshScoreTxt(this.sceneData.score);
            this.initEvent();
            // 场景定时器
            Laya.timer.frameLoop(1, this, this.onLoop);
        };
        /** 重写父类函数 */
        MainScene.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
        };
        MainScene.prototype.initUI = function () {
            this._mapContainer = new Game.MapContainer();
            this._mapContainer.init();
            this.addChild(this._mapContainer);
            this._mainUI = new Game.GameMainUI();
            this.addChild(this._mainUI);
        };
        MainScene.prototype.initEvent = function () {
            Laya.stage.on(Event.MOUSE_DOWN, this, this.onMouseDown);
            Laya.stage.on(Event.MOUSE_UP, this, this.onMouseUp);
            Laya.stage.on(Event.MOUSE_MOVE, this, this.onMouseMove);
            // Laya.stage.on(Event.MOUSE_OUT, this, this.onMouseOut);
            this._player.on(Global.Event.ON_UPDATE_POWER, this, this.onUpdatePower);
            this._player.on(Global.Event.RECYCLE_FOOD, this, this.onRecycleFood);
            this._player.on(Global.Event.RESET_FOOD, this, this.onResetFood);
            this._player.on(Global.Event.CHANGE_PLAYER_FOOD_ID, this, this.onChangePlayerFoodId);
            this._player.on(Global.Event.CHANGE_PLAYER_ATTR, this, this.onChangePlayerAttr);
            Game.EventMgr.instance.on(Global.Event.SET_CARRY_ICON_VISIBLE, this, this.onSetCarryIconVisible);
            Game.EventMgr.instance.on(Global.Event.GET_BUFF, this, this.onGetBuff);
            Game.EventMgr.instance.on(Global.Event.IN_RECYCLE_AREA, this, this.onRecycleArea);
            Game.EventMgr.instance.on(Global.Event.GAME_OVER, this, this.onGameOver);
            Game.EventMgr.instance.on(Global.Event.CARRY_FOOD, this, this.onCarryFood);
            Game.EventMgr.instance.on(Global.Event.DROPOUT_FOOD, this, this.onDropoutFood);
        };
        MainScene.prototype.onLoop = function () {
            this._mapContainer.moveMap(this._mainUI.getMoveIconAngle());
            //     let leftTime = new Date().getTime() - this._npcTime;
        };
        MainScene.prototype.onMouseDown = function (evt) {
            this._mainUI.onMouseDown(evt);
        };
        MainScene.prototype.onMouseUp = function (evt) {
            this._mainUI.onMouseUp(evt);
        };
        MainScene.prototype.onMouseMove = function (evt) {
            this._mainUI.onMouseMove(evt);
        };
        /** 设置搬运图标是否显示 */
        MainScene.prototype.onSetCarryIconVisible = function (foodId) {
            this._mainUI.setCarryIconVisible(foodId);
        };
        /** 获取一个buff */
        MainScene.prototype.onGetBuff = function (buffCfgId) {
            this._player.onGetBuff(buffCfgId);
        };
        /** 是否处在回收点范围 */
        MainScene.prototype.onRecycleArea = function (inRecycleArea) {
            if (inRecycleArea) {
                this._player.inRecycleArea();
            }
            else {
                this._player.outRecycleArea();
            }
        };
        /** 游戏结束 */
        MainScene.prototype.onGameOver = function () {
            Game.DataMgr.instance.isGameOver = true;
            Game.viewMgr.showView(Global.ViewId.GAME_OVER_UI, this.sceneData.score);
        };
        /** 搬运食物 */
        MainScene.prototype.onCarryFood = function (foodId) {
            var food = this._mapContainer.getFood(foodId);
            this._player.onCarryFood(food);
        };
        /** 丢弃食物 */
        MainScene.prototype.onDropoutFood = function () {
            var foodId = Game.DataMgr.instance.myPlayerData.foodId;
            if (foodId != 0) {
                this._player.setFoodId(0);
                this._player.resetPowerDelta();
                this.onResetFood(foodId);
            }
        };
        /** 更新玩家体力 */
        MainScene.prototype.onUpdatePower = function (percent) {
            this._mainUI.refreshPlayerPower(percent);
        };
        /** 回收食物 */
        MainScene.prototype.onRecycleFood = function (foodId) {
            this._mapContainer.foodContainer.removeFood(foodId);
            this._mainUI.refreshScoreTxt(this._player.data.score);
        };
        /** 还原食物 */
        MainScene.prototype.onResetFood = function (foodId) {
            this._mapContainer.foodContainer.dropoutFood(foodId);
        };
        /** 改变玩家食物ID */
        MainScene.prototype.onChangePlayerFoodId = function (foodId) {
            this._mainUI.setDropoutIconVisible(foodId != 0);
        };
        /** 改变玩家属性 */
        MainScene.prototype.onChangePlayerAttr = function (attrType) {
            switch (attrType) {
                case Game.ATTR_TYPE.attack:
                    this._mainUI.refreshAttackTxt(this._player.data.attack);
                    break;
                case Game.ATTR_TYPE.walkSpeed:
                    this._mainUI.refreshSpeedTxt(this._player.data.walkSpeed);
                    break;
            }
        };
        return MainScene;
    }(Core.BaseScene));
    Game.MainScene = MainScene;
})(Game || (Game = {}));
//# sourceMappingURL=MainScene.js.map