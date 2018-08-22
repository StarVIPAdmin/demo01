/**
 * 积分配置表
 */
class ScoreCfg extends BaseCfg
{
    /** 配置表路径 */
    static get path():string
    {
        return Global.Path.CFG_PATH + "score_cfg.json";
    }

    static checkLevelByScore(score:number):number
    {
        let scoreCfg = this._data.ScoreCfg;
        let len = scoreCfg.length;
        for (var i = 0; i < len; i++) {
            if (score < scoreCfg[i]) {
                return i + 1;
            }
        }
        return len;
    }
}