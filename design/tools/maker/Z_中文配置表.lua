--测试

clsMaker = clsMakerBase:Inherit()

function clsMaker:MakeTable()
	local serv,client = {},{}

	--常量配置
	client.Const = self.SheetData["常量配置"]

	local allcfg_client = {}

	local function transfunc(k,v,client)
		assert(not allcfg_client[k],"id重复配置:"..k)
		allcfg_client[k] = client[k]
	end

	--中文配置表
	local _, tclient = self:GenConfg("中文配置表")
	local tbl = {}
	for k, v in pairs(tclient) do
		transfunc(k, v, tclient)
		tbl[v.LangId] = v.Desc
	end
	client.LanguageCfg = tbl

	return nil,client
end 



return clsMaker
