return function (data)
	if data == "" then return nil end 
	local ret = tonumber(data)
	if not ret then
		return nil
	end
	
	if math.floor(ret) == ret then
		return ret
	end
	
	return nil
end