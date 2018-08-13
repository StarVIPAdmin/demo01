var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game;
(function (Game) {
    var Sound = Laya.SoundManager;
    /**
     * 声音管理类
     */
    var SoundMgr = /** @class */ (function (_super) {
        __extends(SoundMgr, _super);
        function SoundMgr() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(SoundMgr, "instance", {
            /** 获取单例实例 */
            get: function () {
                return _super.getInstanceOrCreate.call(this, SoundMgr);
            },
            enumerable: true,
            configurable: true
        });
        /** 重写父类函数 */
        SoundMgr.prototype.onCreate = function () {
            this.m_silence = false;
        };
        /** 重写父类函数 */
        SoundMgr.prototype.onDestroy = function () {
        };
        SoundMgr.prototype.playMenuBgMusic = function () {
            if (!this.m_silence) {
                // Sound.playMusic(Global.Path.MP3_WELCOME_PATH, 0);
            }
        };
        SoundMgr.prototype.playGameBgMusic = function () {
            if (!this.m_silence) {
                // Sound.playMusic(Global.Path.MP3_BG_PATH, 0);
            }
        };
        SoundMgr.prototype.playEat = function () {
            if (!this.m_silence) {
                Sound.stopAllSound();
                // Sound.playSound(Global.Path.MP3_EAT_PATH, 1);
            }
        };
        SoundMgr.prototype.playCoffee = function () {
            if (!this.m_silence) {
                // Sound.playSound(Global.Path.MP3_COFFEE_PATH, 1);
            }
        };
        SoundMgr.prototype.playMushroom = function () {
            if (!this.m_silence) {
                // Sound.playSound(Global.Path.MP3_MUSHROOM_PATH, 1);
            }
        };
        SoundMgr.prototype.playHit = function () {
            if (!this.m_silence) {
                // Sound.playSound(Global.Path.MP3_HIT_PATH, 1);
            }
        };
        SoundMgr.prototype.playHurt = function () {
            if (!this.m_silence) {
                // Sound.playSound(Global.Path.MP3_HURT_PATH, 1);
            }
        };
        SoundMgr.prototype.playLose = function () {
            if (!this.m_silence) {
                // Sound.playSound(Global.Path.MP3_LOSE_PATH, 1);
            }
        };
        SoundMgr.prototype.stop = function () {
            Sound.stopAll();
        };
        SoundMgr.prototype.toggleOnOff = function () {
            if (this.m_silence) {
                this.m_silence = false;
                Sound.setMusicVolume(1);
                Sound.setSoundVolume(1);
            }
            else {
                this.m_silence = true;
                Sound.setMusicVolume(0);
                Sound.setSoundVolume(0);
            }
        };
        return SoundMgr;
    }(Core.BaseSingleton));
    Game.SoundMgr = SoundMgr;
})(Game || (Game = {}));
//# sourceMappingURL=SoundMgr.js.map