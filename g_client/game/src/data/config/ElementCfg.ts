/**
 * 元素配置表
 */
class ElementCfg extends BaseCfg
{
    /** 重写父类函数 */
    static get name():string
    {
        return "element_cfg";
    }

    static getBuffCfg(cfgId:number):any
    {
        return this._data.BuffCfg[cfgId];
    }
}