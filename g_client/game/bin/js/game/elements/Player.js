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
    var Sprite = Laya.Sprite;
    // 类标识（用于对象池回收）
    var ENEMY_CLASS_SIGN = "enemy";
    Game.ROLE_CLASS_SIGN = "role";
    // 玩家属性类型
    Game.PLAYER_ATTR_TYPE = {
        attack: "attack",
        walkSpeed: "walkSpeed"
    };
    /**
     * 玩家基类
     */
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        function Player() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** 重写父类函数 */
        Player.prototype.init = function (id) {
            _super.prototype.init.call(this, id);
        };
        /** 重写父类函数 */
        Player.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        /** 从场景移除（返回对象池） */
        Player.prototype.remove = function () {
        };
        return Player;
    }(Game.BaseElement));
    /**
     * 主角类
     */
    var Role = /** @class */ (function (_super) {
        __extends(Role, _super);
        function Role() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Role.prototype, "data", {
            get: function () {
                return Game.DataMgr.instance.roleData;
            },
            enumerable: true,
            configurable: true
        });
        /** 重写父类函数 */
        Role.prototype.init = function (id) {
            _super.prototype.init.call(this, id);
            this._powerDelta = this.data.powerDelta;
            Laya.timer.loop(1000, this, this.onLoop);
        };
        /** 重写父类函数 */
        Role.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            Laya.timer.clearAll(this);
            Laya.Pool.recover(Game.ROLE_CLASS_SIGN, this);
        };
        Role.prototype.onLoop = function () {
            // 更新体力
            var newPower = this.data.curPower + this._powerDelta;
            this.data.curPower = newPower;
            if (this.data.totalPower != 0) {
                var percent = this.data.curPower / this.data.totalPower;
                this.event(Global.Event.ON_UPDATE_POWER, [percent]);
            }
            // 体力不足
            if (this.data.foodId != 0) {
                if (newPower <= 0) {
                    this.event(Global.Event.RESET_FOOD, [this.data.foodId]);
                    this.setFoodId(0);
                    this.resetPowerDelta();
                }
            }
        };
        /** 获取一个buff */
        Role.prototype.onGetBuff = function (cfgId) {
            var buffCfg = ElementCfg.getBuffCfg(cfgId);
            if (buffCfg == null) {
                return;
            }
            var param;
            var oldValue;
            switch (buffCfg.BuffEffect) {
                case "PowerUnChanged":
                    // 耐力不变
                    param = buffCfg.BuffParam;
                    this._powerDelta = 0;
                    Laya.timer.clear(this, this.resetPowerDelta);
                    Laya.timer.once(param.Times * 100, this, this.resetPowerDelta);
                    break;
                case "SpeedUp":
                    // 速度提升
                    param = buffCfg.BuffParam;
                    oldValue = this.data.walkSpeed;
                    this.setWalkSpeedAttrValue(oldValue * (1 + param.UpVal / 100));
                    Laya.timer.clear(this, this.setWalkSpeedAttrValue);
                    Laya.timer.once(param.Times * 100, this, this.setWalkSpeedAttrValue, [oldValue]);
                    break;
                case "AttackUp":
                    // 攻击提升
                    param = buffCfg.BuffParam;
                    oldValue = this.data.attack;
                    this.setAttackAttrValue(oldValue * (1 + param.UpVal / 100));
                    Laya.timer.clear(this, this.setAttackAttrValue);
                    Laya.timer.once(param.Times * 100, this, this.setAttackAttrValue, [oldValue]);
                    break;
            }
        };
        /** 设置攻击属性 */
        Role.prototype.setAttackAttrValue = function (attrValue) {
            this.data.attack = attrValue;
            this.event(Global.Event.CHANGE_PLAYER_ATTR, [Game.PLAYER_ATTR_TYPE.attack, attrValue]);
        };
        /** 设置行走速度属性 */
        Role.prototype.setWalkSpeedAttrValue = function (attrValue) {
            this.data.walkSpeed = attrValue;
            this.event(Global.Event.CHANGE_PLAYER_ATTR, [Game.PLAYER_ATTR_TYPE.walkSpeed, attrValue]);
        };
        /** 处在回收点范围 */
        Role.prototype.inRecycleArea = function () {
            // 回收食物
            if (this.data.foodId != 0) {
                var foodData = Game.DataMgr.instance.getFoodData(this.data.foodId);
                this.addScore(foodData.score);
                this.event(Global.Event.RECYCLE_FOOD, [this.data.foodId]);
                this.setFoodId(0);
            }
            this._powerDelta = this.data.powerDelta * 5;
            this.data.state = Data.PlayerState.PROTECT;
        };
        /** 离开回收点范围 */
        Role.prototype.outRecycleArea = function () {
            this._powerDelta = this.data.powerDelta;
            this.data.state = Data.PlayerState.IDE;
        };
        /** 搬运食物 */
        Role.prototype.onCarryFood = function (food) {
            this.setFoodId(food.data.id);
            food.setCarryState();
            food.pos(0, 0);
            this.addChild(food);
            this._powerDelta = food.data.weight * -2;
        };
        /** 设置玩家身上食物ID */
        Role.prototype.setFoodId = function (foodId) {
            this.data.foodId = foodId;
            this.event(Global.Event.CHANGE_PLAYER_FOOD_ID, [foodId]);
        };
        /** 重置体力回复增量（自然增加值） */
        Role.prototype.resetPowerDelta = function () {
            this._powerDelta = this.data.powerDelta;
        };
        /** 增加积分 */
        Role.prototype.addScore = function (score) {
            var newScore = this.data.score + score;
            this.data.score = newScore;
            var newLvl = ScoreCfg.checkLevelByScore(newScore);
            if (newLvl != this.data.level) {
                this.data.level = newLvl;
                var scale = 1 + (newLvl - 1) * 0.1;
                this.scale(scale, scale);
            }
        };
        return Role;
    }(Player));
    Game.Role = Role;
    /**
     * 敌人类
     */
    var Enemy = /** @class */ (function (_super) {
        __extends(Enemy, _super);
        function Enemy() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Enemy.prototype, "data", {
            get: function () {
                return Game.DataMgr.instance.getPlayerData(this.id);
            },
            enumerable: true,
            configurable: true
        });
        /** 重写父类函数 */
        Enemy.prototype.init = function (id) {
            _super.prototype.init.call(this, id);
            Laya.timer.frameLoop(1, this, this.onLoop);
        };
        /** 重写父类函数 */
        Enemy.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            Laya.timer.clearAll(this);
            Laya.Pool.recover(ENEMY_CLASS_SIGN, this);
        };
        Enemy.prototype.onLoop = function () {
            var parent = this.parent;
            var isTouch = parent.mapContainer.checkPlayerCollision(this.x, this.y, this.data.collisionRadius);
            if (isTouch) {
                var roleAttack = Game.DataMgr.instance.roleData.attack;
                if (roleAttack < this.data.attack) {
                    // 玩家阵亡
                    Game.EventMgr.instance.event(Global.Event.GAME_OVER);
                }
                else if (roleAttack > this.data.attack) {
                    // 杀死敌人
                    parent.removeEnemy(this.data.id);
                    this.setDeathState();
                }
            }
        };
        /** 设置死亡状态 */
        Enemy.prototype.setDeathState = function () {
            this.data.state = Data.PlayerState.DEATH;
        };
        return Enemy;
    }(Player));
    /**
     * 敌人类容器
     */
    var EnemyContainer = /** @class */ (function (_super) {
        __extends(EnemyContainer, _super);
        function EnemyContainer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(EnemyContainer.prototype, "mapContainer", {
            get: function () {
                return this._mapContainer;
            },
            enumerable: true,
            configurable: true
        });
        EnemyContainer.prototype.init = function (parentContainer) {
            this._mapContainer = parentContainer;
            this._enemyList = [];
        };
        /** 创建敌人 */
        EnemyContainer.prototype.createEnemy = function (id) {
            var enemy = Laya.Pool.getItemByClass(ENEMY_CLASS_SIGN, Enemy);
            enemy.init(id);
            return enemy;
        };
        /** 重置玩家 */
        EnemyContainer.prototype.resetEnemy = function () {
            var _this = this;
            // 清理旧数据
            this.clearEnemy();
            var dataList = Game.DataMgr.instance.enemyData;
            if (dataList == null || dataList.length == 0) {
                return;
            }
            dataList.forEach(function (data) {
                var enemy = _this.createEnemy(data.id);
                _this.addChild(enemy);
                _this._enemyList[data.id] = enemy;
            });
        };
        /** 根据唯一ID，增加指定玩家 */
        EnemyContainer.prototype.addEnemy = function (id) {
            if (this.checkEnemy(id)) {
                return;
            }
            var enemy = this.createEnemy(id);
            this.addChild(enemy);
            this._enemyList[id] = enemy;
        };
        /** 根据唯一ID，移除指定玩家 */
        EnemyContainer.prototype.removeEnemy = function (id) {
            if (!this.checkEnemy(id))
                return;
            var enemy = this._enemyList[id];
            enemy.destroy();
            this._enemyList[id] = null;
        };
        /** 清除玩家 */
        EnemyContainer.prototype.clearEnemy = function () {
            if (!this.checkEnemyList())
                return;
            this._enemyList.forEach(function (item) {
                item.destroy();
            });
            this._enemyList = [];
        };
        /** 检测玩家列表是否有数据 */
        EnemyContainer.prototype.checkEnemyList = function () {
            return !(this._enemyList == null || this._enemyList.length == 0);
        };
        /** 根据唯一ID，检测玩家是否存在 */
        EnemyContainer.prototype.checkEnemy = function (id) {
            if (!this.checkEnemyList()) {
                return false;
            }
            return this._enemyList[id] != null;
        };
        return EnemyContainer;
    }(Sprite));
    Game.EnemyContainer = EnemyContainer;
})(Game || (Game = {}));
//# sourceMappingURL=Player.js.map