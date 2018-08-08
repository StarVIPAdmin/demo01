clsMaker = clsMakerBase:Inherit()

function clsMaker:MakeTable()
	local serv,client = {},{}

	--常量配置
	serv.Const = self.SheetData["常量配置"]
	client.Const = self.SheetData["常量配置"]

	local tb = {}
	--角色经验
	local tserv,tclient = self:GenConfg("姓")
	for k,v in pairs(tclient) do 
		table.insert(tb,v.Name)
	end 
	client.RoleSurNameCfg = tb
	
	tb = {}
	tserv,tclient = self:GenConfg("名")
	for k,v in pairs(tclient) do 
		table.insert(tb,v.Name)
	end 
	client.RoleNameCfg = tb

	return client,client --服务器的机器人也需要随机名字
end 



return clsMaker
