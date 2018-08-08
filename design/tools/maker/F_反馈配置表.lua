--测试

clsMaker = clsMakerBase:Inherit()

function clsMaker:MakeTable()
	local serv,client = {},{}

	--常量配置
	serv.Const = self.SheetData["常量配置"]
	client.Const = self.SheetData["常量配置"]

	local allcfg_serv,allcfg_client = {},{}

	local function transfunc(k,v,client)
		assert(not allcfg_serv[k],"id重复配置:"..k)
		allcfg_serv[k] = v
		allcfg_client[k] = client[k]
	end

	--登录反馈提示
	local tserv,tclient = self:GenConfg("反馈提示")
	for k,v in pairs(tserv) do 
		transfunc(k,v,tclient)
	end 
	
	serv.FeedbackCfg = allcfg_serv
	client.FeedbackCfg = allcfg_client
	return serv,client
end 

return clsMaker
