return function (data)
	if data == "" then return nil end 
	local ret = tonumber(data)
	if not ret then
		return nil
	end
	
	if math.floor(ret) == ret then
		local path = g_serverPath.."item_cfg.lua"
		local cfg = g_checker_loadcfg[path]
		if not cfg then 
			cfg = dofile(path)
			g_checker_loadcfg[path] = cfg
		end 
		assert(cfg.ItemCfg[ret],"物品id不存在:"..ret)
		return ret
	end
	return nil
end