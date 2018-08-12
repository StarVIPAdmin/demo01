module Game {
    import Sprite = Laya.Sprite;

    /**
     * 地图类
     */
    export class MapFloor extends Sprite 
    {
        private _mapSpr:Sprite;
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
            this._mapSpr = new Sprite();
            this._mapSpr.graphics.clear();
            this._mapSpr.graphics.drawTexture(Laya.loader.getRes(Global.Path.JPG_BACKGROUND),0,0,5120,5120);
            this.addChild(this._mapSpr);

            // let floor = this.addFloor(1);
            // floor.pos(0, Global.Const.GAME_HEIGHT - floor.height, true);
            // Laya.timer.frameLoop(1, this, this.onLoop);
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

        moveMap(angle:number):void 
        {
            if (angle == 0) 
                return;

            let deltaPosX = Data.playerData.speed * Math.cos(angle);
            let deltaPosY = Data.playerData.speed * Math.sin(angle);
            let targetPosX = this._mapSpr.x - deltaPosX;
            let targetPosY = this._mapSpr.y - deltaPosY;

            let minPosX = - 5120 + Global.Const.GAME_WIDTH * 0.5;
            let minPosY = - 5120 + Global.Const.GAME_HEIGHT * 0.5;
            let maxPosX = Global.Const.GAME_WIDTH * 0.5;
            let maxPosY = Global.Const.GAME_HEIGHT * 0.5;
            if (targetPosX < minPosX) targetPosX = minPosX;
            if (targetPosX > maxPosX) targetPosX = maxPosX;
            if (targetPosY < minPosY) targetPosY = minPosY;
            if (targetPosY > maxPosY) targetPosY = maxPosY;
            this._mapSpr.pos(targetPosX, targetPosY);
        }
    }
}