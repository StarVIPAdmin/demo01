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
     * 地图类
     */
    var MapFloor = /** @class */ (function (_super) {
        __extends(MapFloor, _super);
        function MapFloor() {
            var _this = _super.call(this) || this;
            _this._dieFloorList = [];
            _this._liveFloorList = [];
            _this.onInit();
            return _this;
        }
        MapFloor.prototype.onInit = function () {
            this._mapSpr = new Sprite();
            this._mapSpr.graphics.clear();
            this._mapSpr.graphics.drawTexture(Laya.loader.getRes(Global.Path.JPG_BACKGROUND), 0, 0, 5120, 5120);
            this.addChild(this._mapSpr);
            // let floor = this.addFloor(1);
            // floor.pos(0, Global.Const.GAME_HEIGHT - floor.height, true);
            // Laya.timer.frameLoop(1, this, this.onLoop);
        };
        MapFloor.prototype.onLoop = function () {
            while (this._dieFloorList.length > 0) {
                var floor = this._dieFloorList.shift();
                floor.removeSelf();
                Laya.Pool.recover("floor", floor);
            }
        };
        MapFloor.prototype.addFloor = function (floorType) {
            var floor = Laya.Pool.getItemByClass("floor", Game.Floor);
            floor.init(floorType);
            floor.once(Global.Event.FLOOR_OUT_COMPLETE, this, this.getFloor);
            floor.once(Global.Event.FLOOR_OUT_DIE, this, this.delFloor);
            this.addChild(floor);
            this._liveFloorList.push(floor);
            return floor;
        };
        MapFloor.prototype.delFloor = function (floor) {
            this._dieFloorList.push(floor);
            // this._liveFloorList.slice(1, 1);
            var len = this._liveFloorList.length;
            for (var i = 0; i < len; i++) {
                var tar = this._liveFloorList[i];
            }
        };
        MapFloor.prototype.getFloor = function (floor) {
            this.addFloor(2);
        };
        MapFloor.prototype.moveMap = function (angle) {
            if (angle == 0)
                return;
            var deltaPosX = Data.playerData.speed * Math.cos(angle);
            var deltaPosY = Data.playerData.speed * Math.sin(angle);
            var targetPosX = this._mapSpr.x - deltaPosX;
            var targetPosY = this._mapSpr.y - deltaPosY;
            var minPosX = -5120 + Global.Const.GAME_WIDTH * 0.5;
            var minPosY = -5120 + Global.Const.GAME_HEIGHT * 0.5;
            var maxPosX = Global.Const.GAME_WIDTH * 0.5;
            var maxPosY = Global.Const.GAME_HEIGHT * 0.5;
            if (targetPosX < minPosX)
                targetPosX = minPosX;
            if (targetPosX > maxPosX)
                targetPosX = maxPosX;
            if (targetPosY < minPosY)
                targetPosY = minPosY;
            if (targetPosY > maxPosY)
                targetPosY = maxPosY;
            this._mapSpr.pos(targetPosX, targetPosY);
        };
        return MapFloor;
    }(Sprite));
    Game.MapFloor = MapFloor;
})(Game || (Game = {}));
//# sourceMappingURL=MapFloor.js.map