//初始化微信小游戏
Laya.MiniAdpter.init();
//程序入口
Laya.init(Global.Const.GAME_WIDTH, Global.Const.GAME_HEIGHT, Laya.WebGL);
//激活资源版本控制
Laya.ResourceVersion.enable("version.json?"+Math.random(), Laya.Handler.create(this, onCompleteHandler), Laya.ResourceVersion.FILENAME_VERSION);

function onCompleteHandler():void 
{
    // 设置适配模式
    Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
    // 设置居中对齐
    Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
    Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
    // 设置横竖屏
    Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
    // 设置背影颜色
    Laya.stage.bgColor = "#232323";
    // 显示FPS
    Laya.Stat.show(300, 0);

    let resUrl:Array<any> = [];
    resUrl.push({ "url":Global.Path.JSON_PLAYER, "type":Laya.Loader.ATLAS });
    resUrl.push({ "url":Global.Path.PNG_BACKGROUND, "type":Laya.Loader.IMAGE });
    resUrl.push({ "url":Global.Path.PNG_M_BACKGROUND, "type":Laya.Loader.IMAGE });
    // resUrl.push({ "url":Global.Path.PNG_ITEM_1, "type":Laya.Loader.IMAGE });
    // resUrl.push({ "url":Global.Path.PNG_ITEM_2, "type":Laya.Loader.IMAGE });
    // resUrl.push({ "url":Global.Path.PNG_ITEM_3, "type":Laya.Loader.IMAGE });
    // resUrl.push({ "url":Global.Path.PNG_ITEM_4, "type":Laya.Loader.IMAGE });
    // resUrl.push({ "url":Global.Path.PNG_BIRD_1, "type":Laya.Loader.IMAGE });
    // resUrl.push({ "url":Global.Path.PNG_BIRD_2, "type":Laya.Loader.IMAGE });
    // resUrl.push({ "url":Global.Path.PNG_BIRD_3, "type":Laya.Loader.IMAGE });
    // resUrl.push({ "url":Global.Path.PNG_BIRD_4, "type":Laya.Loader.IMAGE });
    // resUrl.push({ "url":Global.Path.PNG_EFFECT, "type":Laya.Loader.IMAGE });
    // resUrl.push({ "url":Global.Path.PNG_SPIRIT_EFFECT, "type":Laya.Loader.IMAGE });
    resUrl.push({ "url":Global.Path.PNG_COMBAT_MOVE_BG, "type":Laya.Loader.IMAGE });
    resUrl.push({ "url":Global.Path.PNG_COMBAT_MOVE_ICON, "type":Laya.Loader.IMAGE });

    resUrl.push({ "url":Global.Path.PNG_BAR_MP, "type":Laya.Loader.IMAGE });
    resUrl.push({ "url":Global.Path.PNG_BAR_HP, "type":Laya.Loader.IMAGE });
    resUrl.push({ "url":Global.Path.PNG_BAR_BG, "type":Laya.Loader.IMAGE });
    resUrl.push({ "url":Global.Path.PNG_FLOOR, "type":Laya.Loader.IMAGE });

    function onLoaded():void {
        // 加载完成, 进入游戏
        Game.main.run();
    }

    // 资源预加载loading界面
    (new Game.LoadingUI()).onShow(resUrl, onLoaded);
}