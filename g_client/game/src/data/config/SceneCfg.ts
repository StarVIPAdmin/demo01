/**
 * 场景配置表
 */
class SceneCfg extends BaseCfg
{
    /** 重写父类函数 */
    static get name():string
    {
        return "scene_cfg";
    }

    static getSceneCfg(cfgId:number):any
    {
        return this._data.SceneCfg[cfgId];
    }
}