-- local const_cfg = dofile(g_serverPath.."const_cfg.lua")

clsMaker = clsMakerBase:Inherit()

function clsMaker:MakeTable()
	local serv,client = {},{}

	--常量配置
	serv.Const = self.SheetData["常量配置"]
	client.Const = self.SheetData["常量配置"]


	local function createItemTbl(SheetName)
		local target_serv,target_client = {},{}
		local tserv,tclient = self:GenConfg(SheetName)
		for k, v in pairs(tserv) do
			if v.BuffEffect == "耐力不变" then
				v.BuffEffect = "PowerUnChanged"
			elseif v.BuffEffect == "速度提升" then
				v.BuffEffect = "SpeedUp"
			elseif v.BuffEffect == "攻击提升" then
				v.BuffEffect = "AttackUp"
			end
			target_serv[v.CfgId] = v
		end
		for k, v in pairs(tclient) do
			if v.BuffEffect == "耐力不变" then
				v.BuffEffect = "PowerUnChanged"
			elseif v.BuffEffect == "速度提升" then
				v.BuffEffect = "SpeedUp"
			elseif v.BuffEffect == "攻击提升" then
				v.BuffEffect = "AttackUp"
			end
			target_client[v.CfgId] = v
		end
		return target_serv, target_client
	end

	-- 食物
	local item_serv, item_client = createItemTbl("食物")
	serv.FoodCfg = item_serv
	client.FoodCfg = item_client

	-- 药剂
	local item_serv, item_client = createItemTbl("药剂")
	serv.BuffCfg = item_serv
	client.BuffCfg = item_client

	-- 洞穴
	local item_serv, item_client = createItemTbl("洞穴")
	serv.RecycleCfg = item_serv
	client.RecycleCfg = item_client
	return serv,client
end 



return clsMaker
