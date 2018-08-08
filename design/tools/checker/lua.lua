return function (data)
	if data == "" then return nil end 
	local var
	local ret, err = xpcall(function ()
		local str = "return "..data
		var = loadstring(str)()
	end, function(msg) printf("%s: %s",data,msg) end)
	if not var then
		assert(false, "lua checker:"
					.."\nexamples:"
					.."\n	number:123"
					.."\n	string: \"abc\""
					.."\n	table :{123, \"abc\"}"
					.."\n	boolean: true/false")
	end
	return var
end
