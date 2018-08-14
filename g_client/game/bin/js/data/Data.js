var Data;
(function (Data) {
    // 初始化
    function init() {
        Data.isGameOver = false;
        Data.playerDataList = [];
        Data.foodDataList = [];
        Data.buffDataList = [];
        Data.recycleDataList = [];
        Data.myPlayerData = new Data.PlayerData(1);
        Data.myPlayerData.init();
    }
    Data.init = init;
})(Data || (Data = {}));
//# sourceMappingURL=Data.js.map