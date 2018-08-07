module Game {
    import Sprite = Laya.Sprite;

    /**
     * 地图地板类
     */
    export class MapFloor extends Sprite 
    {
        private _dieFloorList:Array<Floor>;
        private _liveFloorList:Array<Floor>;

        constructor()
        {
            super();
            this._dieFloorList = [];
            this._liveFloorList = [];
            this.onInit();
        }

        onInit():void 
        {
            let floor = this.addFloor(1);
            floor.pos(0, Global.Const.GAME_HEIGHT - floor.height, true);
            Laya.timer.frameLoop(1, this, this.onLoop);
        }

        onLoop():void 
        {
            while(this._dieFloorList.length > 0) {
                let floor = this._dieFloorList.shift();
                floor.removeSelf();
                Laya.Pool.recover("floor", floor);
            }
        }

        addFloor(floorType:number):Floor 
        {
            let floor:Floor = Laya.Pool.getItemByClass("floor", Floor);
            floor.init(floorType);
            floor.once(Global.Event.FLOOR_OUT_COMPLETE, this, this.getFloor);
            floor.once(Global.Event.FLOOR_OUT_DIE, this, this.delFloor);
            this.addChild(floor);
            this._liveFloorList.push(floor);
            return floor;
        }

        delFloor(floor:Floor):void 
        {
            this._dieFloorList.push(floor);

            // this._liveFloorList.slice(1, 1);

            let len = this._liveFloorList.length;
            for (var i = 0; i < len; i++) {
                var tar = this._liveFloorList[i];
            }
        }

        getFloor(floor:Floor):void 
        {
            this.addFloor(2);
        }

        moveMap(toRight:boolean):void 
        {
            let dir = toRight ? 1 : -1;
            this.x += 0.2 * 1.2 * dir;
        }
    }
}