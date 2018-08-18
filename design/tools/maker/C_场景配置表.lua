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
			target_serv[v.CfgId] = v
		end
		for k, v in pairs(tclient) do
			target_client[v.CfgId] = v
		end
		return target_serv, target_client
	end

	local item_serv, item_client = createItemTbl("场景")
	serv.SceneCfg = item_serv
	client.SceneCfg = item_client
	return serv,client
end 



return clsMaker
