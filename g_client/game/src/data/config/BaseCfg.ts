class BaseCfg
{
    // 配置数据
    protected static _data:any = null;

    /** 配置表名（必须重写） */
    static get name():string
    {
        return "";
    }

    /** 提供外部获取配置数据 */
    static get data():any
    {
        return this.data;
    }

    /** 初始化 */
    static onInit():void 
    {
        if (this._data == null && this.name != "") {
            this._data = Laya.loader.getRes(Global.Path.CFG_PATH + this.name + ".json");
        }
    }
}