var Data;
(function (Data) {
    // 初始化
    function init() {
        Data.isGameOver = false;
        Data.playerDataList = [];
        Data.myPlayerData = new Data.PlayerData(1);
    }
    Data.init = init;
})(Data || (Data = {}));
//# sourceMappingURL=Data.js.map