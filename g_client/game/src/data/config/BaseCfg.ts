class BaseCfg
{
    // 配置数据
    protected static _data:any = null;

    /** 提供外部获取配置数据 */
    static get data():any
    {
        return this._data;
    }

    /** 初始化 */
    static onInit(cfgPath:string):void 
    {
        if (this._data == null) {
            this._data = Laya.loader.getRes(cfgPath);
        }
    }
}