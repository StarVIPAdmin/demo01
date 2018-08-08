clsMaker = clsMakerBase:Inherit()

function clsMaker:MakeTable()
	local serv,client = {},{}

	--常量配置
	serv.Const = self.SheetData["常量配置"]
	client.Const = self.SheetData["常量配置"]

	--属性
	local tserv,tclient = self:GenConfg("属性")
	local tb = {}
	for k,v in pairs(tserv) do 
		tb[v.AttrName] = v.AttrValue
	end 
	serv.Attr = tb
	client.Attr = tb
	
	return serv,client
end 

return clsMaker