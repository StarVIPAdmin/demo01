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
         private _value:number;
         private _bg:Sprite;
         private _bar:Sprite;

         get value():number
         {
             return this._value;
         }

         init():void 
         {
             this.size(SIZE_BG.x, SIZE_BG.y);
             this.initData();
             this.initUI();
         }

         initData():void 
         {
             this._bg = null;
             this._bar = null;
             this._value = VALUE_MIN;
         }

         initUI():void 
         {
             this._bg = ResMgr.instance.createSprite(Global.Path.PNG_BAR_BG, SIZE_BG.x, SIZE_BG.y);
             this.addChild(this._bg);

             this._bar = ResMgr.instance.createSprite(Global.Path.PNG_BAR_HP, SIZE_BAR.x, SIZE_BAR.y, 15, 2);
             this.addChild(this._bar);
         }

         changeValue(Val:number):void 
         {
             this._value += Val;
             if (this._value < VALUE_MIN) {
                 this._value = VALUE_MIN;
             } else if (this._value > VALUE_MAX) {
                 this._value = VALUE_MAX;
             }
             this._bar.scale(this._value / VALUE_MAX, 1);
         }
     }
}