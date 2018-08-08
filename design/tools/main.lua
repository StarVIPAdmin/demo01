
package.cpath = package.cpath..";./?.dll"
require "extra"
require("json")

-- 使用C语言版的serialize
g_tble2Str = extra.serialize
__U8T = extra.ansi_to_utf8
__AT = extra.utf8_to_ansi
local onlyfile = arg[1]
local old_assert = assert
assert = function(cond,str)
	return old_assert(cond,__AT(str))
end 

--打印输出函数
g_outfile = io.open("output/out.txt","w+")
assert(g_outfile)
function printf(fmt,...)
	local str = string.format(fmt,...)
	g_outfile:write(str)
	g_outfile:write("\n")
	print(__U8T(str))
end

g_makerPath = "maker/"
g_outPath = "output/"
g_serverPath = g_outPath.."server/"
g_clientPath = g_outPath.."client/"
g_srcDataPath= "导出数值/"

-- lua表路径
g_path2Lua = "%s/%s.lua"
-- json表路径
g_path2Json = "%sjson/%s.json"

g_checker = {} 			--缓存加载过的checker
g_checker_loadcfg = {}	--缓存checker里加载过的配置文件,以文件路径为key

function _serialize(t, filePath, fileName)
	local luaPath = string.format(g_path2Lua, filePath, fileName)
	local fh = io.open(luaPath, "w+")
	assert(fh, luaPath)
	fh:write("return \n" .. g_tble2Str(t))
	fh:close()

	local jsonPath = string.format(g_path2Json, filePath, fileName)
	local jsonFile = json.encode(dofile(luaPath))
	local fh = io.open(jsonPath, "w+")
	assert(fh, jsonFile)
	fh:write(jsonFile)
	fh:close()
end

dofile("maker/base/util.lua")
dofile("maker/base/objbase.lua")
dofile("maker/base/basemaker.lua")

local allsettings = dofile("allsettings.lua")
local makerFile,dataFile,tarFile
for k,v in pairs(allsettings) do 
	makerFile,dataFile,tarFile = v[1],v[2],v[3]
	local cando = true
	if onlyfile then 
		if __AT(dataFile) ~= onlyfile then 
			cando = false
		end 
	end 
	if cando then 
		assert(makerFile)
		assert(dataFile)
		assert(tarFile)
		dataFile = dataFile..".lua"
		local mfile = g_makerPath..makerFile
		local chunk = assert(loadfile(__AT(mfile)))
		xpcall(function()
			chunk():New(dataFile,tarFile):Make()
		end, function(msg) 
			printf(__AT("[导表失败]: %s, %s, %s\n"), __AT(makerFile), __AT(dataFile), msg)
			os.exit()
		end)
	end 
end 

print("finish.")

