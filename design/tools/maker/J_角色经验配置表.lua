clsMaker = clsMakerBase:Inherit()

function clsMaker:MakeTable()
	local serv,client = {},{}

	--常量配置
	serv.Const = self.SheetData["常量配置"]
	client.Const = self.SheetData["常量配置"]

	--角色经验
	local tserv,tclient = self:GenConfg("角色经验")
	local sTbl, cTbl = {}, {}
	for k, v in pairs(tserv) do
		sTbl[v.Level] = v.MaxExp
		cTbl[v.Level] = v.MaxExp
	end
	serv.RoleExpCfg = sTbl
	client.RoleExpCfg = cTbl
	
	return serv,client
end 



return clsMaker
