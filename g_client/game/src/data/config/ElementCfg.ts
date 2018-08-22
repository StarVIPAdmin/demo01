/**
 * 元素配置表
 */
class ElementCfg extends BaseCfg
{
    /** 配置表路径 */
    static get path():string
    {
        return Global.Path.CFG_PATH + "element_cfg.json";
    }

    static getBuffCfg(cfgId:number):any
    {
        return this._data.BuffCfg[cfgId];
    }

    static getFoodCfg(cfgId:number):any
    {
        return this._data.FoodCfg[cfgId];
    }

    static getRecycleCfg(cfgId:number):any
    {
        return this._data.RecycleCfg[cfgId];
    }
}