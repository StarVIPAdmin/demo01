return {
	["导出"] = {
		["Type"] = {"string","string","string#default",},
		["HeaderName"] = {"字段名","变量名","导出端",},
		["Data"] = {
			[1] = {"反馈id","Id","",},
			[2] = {"样式","Style","c",},
			[3] = {"反馈文本","Text","c",},
		},
	},
	["常量配置"] = {
		["Type"] = {"string","lua","string#default",},
		["HeaderName"] = {"常量名","常量值","描述",},
	},
	["反馈提示"] = {
		["Type"] = {"int#ukey","int","string#default",},
		["HeaderName"] = {"反馈id","样式","反馈文本",},
		["Data"] = {
			[1] = {"1","1","ok",},
			[2] = {"2","1","操作失败",},
			[3] = {"3","1","帐号登录处理中",},
			[4] = {"4","1","版本验证失败",},
			[5] = {"5","1","版本验证完成",},
			[6] = {"6","1","帐号已登录",},
			[7] = {"7","1","服务器忙碌处理中",},
			[8] = {"8","1","TOKEN错误",},
			[9] = {"9","1","TOKEN失效",},
			[10] = {"10","1","帐号名字已被使用",},
			[11] = {"11","1","密码长度过短",},
			[12] = {"12","1","密码长度过长",},
			[13] = {"13","1","帐号名长度过短",},
			[14] = {"14","1","帐号名长度过长",},
			[15] = {"15","1","帐号名不合法",},
			[16] = {"16","1","请再次登录",},
			[17] = {"17","1","角色名长度过短",},
			[18] = {"18","1","登录密码错误",},
			[19] = {"19","1","角色名字已被使用",},
			[20] = {"20","1","角色名字不合法",},
			[21] = {"21","1","角色id不存在",},
			[22] = {"22","1","角色正在创建中",},
			[23] = {"23","1","角色名长度过长",},
			[24] = {"24","1","web服务未连接",},
			[25] = {"25","1","微信登录参数错误",},
			[26] = {"26","1","微信登录验证中",},
			[27] = {"27","1","微信登录验证超时",},
			[28] = {"28","1","没有缓存信息",},
			[29] = {"29","1","微信登录验未通过",},
			[30] = {"30","1","并非同一个连接",},
			[31] = {"31","1","email错误",},
			[32] = {"32","1","反馈提示配置不存在",},
			[33] = {"33","1","服务器维护中",},
		},
	},
}
