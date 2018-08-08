-- local const_cfg = dofile(g_serverPath.."const_cfg.lua")

clsMaker = clsMakerBase:Inherit()

function clsMaker:MakeTable()
	local serv,client = {},{}

	--常量配置
	serv.Const = self.SheetData["常量配置"]
	client.Const = self.SheetData["常量配置"]

	local allitem_serv,allitem_client = {},{}
	local tserv,tclient = self:GenConfg("物品配置表")
	for k, v in pairs(tserv) do
		allitem_serv[v.ItemId] = v
	end
	for k, v in pairs(tclient) do
		allitem_client[v.ItemId] = v
	end
	
	serv.ItemCfg = allitem_serv
	client.ItemCfg = allitem_client
	return serv,client
end 



return clsMaker
