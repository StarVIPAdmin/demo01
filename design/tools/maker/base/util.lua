--工具函数

--字符串分解成数组
function split(str,sep)
	local t = {}
	local b,e = 0,0
	local s
	while b do 
		b,e = string.find(str,sep)
		if b then --如果b==1,s为空字符串""
			s = string.sub(str,1,b-1)
			table.insert(t,s)
			str = string.sub(str,e+1)
		end 
	end 
	table.insert(t,str)
	return t
end

-- function check_reward_table(tb)
-- 	assert(#tb == 3,"奖励格式错误")
-- 	local itemType,itemId,amount = tb[1],tb[2],tb[3]
-- 	local constPath = g_serverPath.."const_cfg.lua"
-- 	local constcfg = g_checker_loadcfg[constPath]
-- 	if not constcfg then 
-- 		constcfg = dofile(constPath)
-- 		g_checker_loadcfg[constPath] = constcfg
-- 	end 
-- 	assert(constcfg.TypeId.NAME2ID[ itemType ], "奖励类型不存在:"..itemType)
-- 	assert(amount > 0,"物品数量错误:"..itemId)
-- 	if itemType == "物品" then 
-- 		local path = g_serverPath.."item_cfg.lua"
-- 		local cfg = g_checker_loadcfg[path]
-- 		if not cfg then 
-- 			cfg = dofile(path)
-- 			g_checker_loadcfg[path] = cfg
-- 		end 
-- 		local itemcfg = cfg.ItemCfg[ itemId ]
-- 		assert(itemcfg,"奖励物品不存在:"..itemId)
-- 		--不可堆叠物品,数量不能大于1; 可堆叠物品,数量不能多于最大堆叠数
-- 		if not itemcfg.CanStack then 
-- 			assert(amount == 1,"不可堆叠物品,数量不能大于1:"..itemId)
-- 		else
-- 			assert(amount <= itemcfg.Stack,"可堆叠物品,数量不能多于最大堆叠数:"..itemId)
-- 		end 
-- 	end 
-- 	return true
-- end 