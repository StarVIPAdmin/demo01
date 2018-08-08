--基础类

--获取一个class的父类
function Super(TmpClass)
	return getmetatable(TmpClass).__index
end

clsObject = {
		__ClassType = "<base class>"
	}
		
function clsObject:Inherit(o)	
	o = o or {}
	setmetatable(o, {__index = self})
	return o
end

function clsObject:New(...)
	local o = {}
	setmetatable(o, {__ObjectType="<base object", __index = self } )
	if o.__init__ then
		o:__init__(...)
	end
	return o
end

function clsObject:__init__()
	--nothing
end
