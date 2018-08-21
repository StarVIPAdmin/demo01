/**
 * 积分配置表
 */
class ScoreCfg extends BaseCfg
{
    /** 重写父类函数 */
    static get name():string
    {
        return "score_cfg";
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