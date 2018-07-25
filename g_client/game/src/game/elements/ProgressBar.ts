module Game {
    import Sprite = Laya.Sprite;

    // 最小/最大值
    const VALUE_MIN:number = 0;
    const VALUE_MAX:number = 100;

    // 进度条尺寸
    const enum SIZE_BG {x=180, y=21};
    const enum SIZE_BAR {x=155, y=12};

    /**
     * 进度条
     */
     export class ProgressBar extends Sprite 
     {
         public value:number;

         private _bg:Sprite;
         private _bar:Sprite;

         constructor(BarType:string) 
         {
             super();
             this.initData();
             this.initUI(BarType);
         }

         initData():void 
         {
             this._bg = null;
             this._bar = null;
             this.value = VALUE_MIN;
         }

         initUI(BarType:string):void 
         {
             this.width = SIZE_BG.x;
             this.height = SIZE_BG.y;

             let texture1 = Laya.loader.getRes(Global.Path.PNG_BAR_BG);
             let texture2;

             switch (BarType) {
                 case Global.Const.BAR_TYPE_MP:
                     texture2 = Laya.loader.getRes(Global.Path.PNG_BAR_MP);
                     break;
                 case Global.Const.BAR_TYPE_HP:
                     texture2 = Laya.loader.getRes(Global.Path.PNG_BAR_HP);
                     break;
             }

             this._bg = new Sprite();
             this._bar = new Sprite();
             this._bar.x = 15;
             this._bar.y = 2;

             this._bg.graphics.drawTexture(texture1, 0, 0, SIZE_BG.x, SIZE_BG.y);
             this._bar.graphics.drawTexture(texture2, 0, 0, SIZE_BAR.x, SIZE_BAR.y);

             this.addChild(this._bg);
             this.addChild(this._bar);
         }

         changeValue(Val:number):void 
         {
             this.value += Val;
             if (this.value < VALUE_MIN) {
                 this.value = VALUE_MIN;
             } else if (this.value > VALUE_MAX) {
                 this.value = VALUE_MAX;
             }
             this._bar.scale(this.value / VALUE_MAX, 1);
         }
     }

}