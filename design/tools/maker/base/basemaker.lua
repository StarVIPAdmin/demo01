--maker 基础类
local table = table 
local pairs = pairs 
local ipairs = ipairs 
local assert = assert 
local string = string 
local dofile = dofile 


clsMakerBase = clsObject:Inherit()

function clsMakerBase:__init__(dataFile, outputFile)
	Super(clsMakerBase).__init__(self)

	self.dataFile = dataFile
	self.outputFile = outputFile

	--printf("%s, %s",self.dataFile,self.outputFile)

	--准备数据
	--配置页数据(除"导出"页外)
	self.SheetData = {}
	self.SourceData = {}
	--导出页
	self.AttrName = {}

	self:LoadData()
end 

--make output
function clsMakerBase:Make()
	local serv_tbl,client_tbl = self:MakeTable()
	if serv_tbl then 
		_serialize(serv_tbl, g_serverPath, self.outputFile)
	end 
	if client_tbl then 
		_serialize(client_tbl, g_clientPath, self.outputFile)
	end 
end

--make table
function clsMakerBase:MakeTable()
	error("派生类必须重写本函数")
end

function clsMakerBase:LoadData()
	local data = dofile(__AT(g_srcDataPath..self.dataFile))
	assert(data,"导出xlsx数据错误")
	self.SourceData = data
	local sheetName = "导出"
	assert(data[sheetName],__AT(self.dataFile.."没有导出属性页"))

	for idx,row in ipairs(data[sheetName].Data) do 
		local cn,en,cs = row[1],row[2],row[3]
		assert(cn,"导出页没有中文名")
		assert(en,"导出页没有英文名")
		assert(not self.AttrName[cn],cn..":表头没有对应的英文名")
		self.AttrName[cn] = {
			ParaName = en,
			CS = cs,
		}
		--printf("%s, %d, %s, %s, %s",sheetName,idx,cn,en,cs)
	end 

	for sheetName,v in pairs(data) do 
		if sheetName == "常量配置" then 
			assert(not self.SheetData[sheetName],"没有常量配置页")
			local sd = {}
			for idx,row in ipairs(v.Data or {}) do 
				local str = string.format("return %s",row[2])
				local chunk,err = loadstring(str)
				assert(chunk,err)
				local ret = chunk()
				assert(ret,"wtf")
				sd[ row[1] ] = ret
				--printf("%s, %s, %s",sheetName,row[1],row[2])
			end 
			self.SheetData[sheetName] = sd
		elseif sheetName ~= "导出" then --其他配置页 
			if not string.find(sheetName,"_策划") then 
				assert(not self.SheetData[sheetName],"wtf")
				local colNum = #v.Type
				local ukey = string.find(v.Type[1],"#ukey") and {} or nil
				for k,t in ipairs(v.Type) do 
					if string.find(t,"#") then 
						if not (string.find(t,"#ukey") or string.find(t,"#default")) then 
							assert(false,t .. ":不支持除了#ukey,#default之外的字段类型")
						end 
					end 
				end 
				assert(colNum == #v.HeaderName,"表头与类型数量不对称")
				for _,cn in pairs(v.HeaderName) do 
					assert(self.AttrName[cn],cn .. ":导出页没有对应的变量名称定义:"..sheetName)
				end 
				--检查字段名是否存在对应的变量名
				local sd = {}
				for idx,row in ipairs(v.Data or {}) do 
					sd[idx] = {}
					assert(#row == colNum,sheetName..":缺少配置数据列数")
					if ukey then 
						assert(not ukey[ row[1] ], sheetName..":ukey 重复")
					end 
					for i,value in ipairs(row) do 
						local val = self:TypeCheck(sheetName,v.Type[i],value)
						sd[idx][i] = val --注意val为nil则不是数组了
						--printf("%s, %d, %d, %s",sheetName,idx,i,tostring(val))
					end 
				end 
				sd.ColNum = colNum
				self.SheetData[sheetName] = sd
			end
		end 
	end 
end

function clsMakerBase:TypeCheck(sheetName,vtype,value)
	local default = false 
	if string.find(vtype,"#default") then 
		default = true
	end 
	local ttype = vtype
	local b,e = string.find(vtype,"#")
	if b and e then 
		ttype = string.sub(vtype,0,b-1)
	end 
	local checkFunc = g_checker[ttype]
	if not checkFunc then 
		checkFunc = dofile(string.format("checker/%s.lua",ttype))
		assert(type(checkFunc) == "function","checker不存在:"..ttype)
		g_checker[ttype] = checkFunc
	end 
	local ret = checkFunc(value)
	if not ret then 
		assert(default,"没有默认值:"..sheetName..":"..vtype)
	end 
	return ret
end

function clsMakerBase:GetSheetData(sheetName)
	return self.SheetData[sheetName]
end

--生成单键
function clsMakerBase:GenConfg(sheetName)
	local attrName = self.AttrName
	local sd = self.SheetData[sheetName]
	local headerName = self.SourceData[sheetName].HeaderName
	local serv = {}
	local client = {}
	local colNum = sd.ColNum
	local ennames = {
		unique = {},
		array  = {},
	}
	local srcKey = self.SourceData[sheetName].Type[1]
	local b,e = string.find(srcKey,"#ukey")
	if not b then 
		assert(false,"GenConfg只用来生成#ukey")
	end 
	for _, row in ipairs(sd) do
		local serv_obj = {}
		local client_obj = {}
		for k=1,colNum do 
			local val = row[k]
			local cn = headerName[k]
			--printf("%s, %s, %d",sheetName, tostring(cn), k)
			local en = attrName[cn].ParaName
			local cs = attrName[cn].CS
			local tos = string.find(cs,"s") or string.find(cs,"S")
			if tos then 
				serv_obj[en] = val
			end 
			local toc = string.find(cs,"c") or string.find(cs,"C")
			if toc then 
				client_obj[en] = val
			end 
			if not tos and not toc then 
				local tox = string.find(cs,"x") or string.find(cs,"X")
				if not tox then 
					serv_obj[en] = val
					client_obj[en] = val
				end 
			end 

			if not ennames.unique[en] then 
				ennames.unique[en] = 1
				table.insert(ennames.array,en)
			end 

			if k == 1 then 
				assert(not serv[val],val..":key字段重复")
				serv[val] = serv_obj
				assert(not client[val],val..":key字段重复")
				client[val] = client_obj
			end 
		end 
	end 
	return serv,client,ennames.array
end 

--生成多键值,以第一个键值为key,所有相同key值的放进同一个数组里
--如果需要多维数组，在上层处理
function clsMakerBase:GenConfg_MV(sheetName)
	local attrName = self.AttrName
	local sd = self.SheetData[sheetName]
	local headerName = self.SourceData[sheetName].HeaderName
	local serv = {}
	local client = {}
	local colNum = sd.ColNum
	local srcKey = self.SourceData[sheetName].Type[1]
	local b,e = string.find(srcKey,"#ukey")
	if b and e then 
		srcKey = string.sub(srcKey,0,b-1)
		assert(false,"GenConfg_MV不能用来生成#ukey")
	end 
	local ennames = {
		unique = {},
		array  = {},
	}

	local rowKey
	for _, row in ipairs(sd) do
		local serv_obj = {}
		local client_obj = {}
		for k=1,colNum do 
			local val = row[k]
			if k == 1 and val then 
				rowKey = val
			end 
			local cn = headerName[k]
			local en = attrName[cn].ParaName
			local cs = attrName[cn].CS
			local tos = string.find(cs,"s") or string.find(cs,"S")
			if tos then 
				serv_obj[en] = val
			end 
			local toc = string.find(cs,"c") or string.find(cs,"C")
			if toc then 
				client_obj[en] = val
			end 
			if not tos and not toc then 
				local tox = string.find(cs,"x") or string.find(cs,"X")
				if not tox then 
					serv_obj[en] = val
					client_obj[en] = val
				end 
			end 

			if not ennames.unique[en] then 
				ennames.unique[en] = 1
				table.insert(ennames.array,en)
			end 

			if k == 1 then 
				if not serv[rowKey] then 
					serv[rowKey] = {}
				end 
				if not client[rowKey] then 
					client[rowKey] = {}
				end 
			end 
		end 
		table.insert(serv[ rowKey ],serv_obj)
		table.insert(client[ rowKey ],client_obj)
	end 
	return serv,client,ennames.array
end 