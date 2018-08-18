clsMaker = clsMakerBase:Inherit()

function clsMaker:MakeTable()
	local serv,client = {},{}

	--常量配置
	serv.Const = self.SheetData["常量配置"]
	client.Const = self.SheetData["常量配置"]

	--角色经验
	local tserv,tclient = self:GenConfg("玩家积分")
	local sTbl, cTbl = {}, {}
	for k, v in pairs(tserv) do
		sTbl[v.Level] = v.NeedScore
		cTbl[v.Level] = v.NeedScore
	end
	serv.ScoreCfg = sTbl
	client.ScoreCfg = cTbl
	return serv,client
end 



return clsMaker
