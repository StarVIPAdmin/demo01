/**
 * 场景配置表
 */
class SceneCfg extends BaseCfg
{
    /** 配置表路径 */
    static get path():string
    {
        return Global.Path.CFG_PATH + "scene_cfg.json";
    }

    static getSceneCfg(cfgId:number):any
    {
        return this._data.SceneCfg[cfgId];
    }
}