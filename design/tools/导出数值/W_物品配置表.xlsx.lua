return {
	["导出"] = {
		["Type"] = {"string","string","string#default",},
		["HeaderName"] = {"字段名","变量名","导出端",},
		["Data"] = {
			[1] = {"物品id","ItemId","",},
			[2] = {"名称","Name","",},
			[3] = {"等级","Level","",},
			[4] = {"品质","Quality","",},
			[5] = {"图标id","IconId","c",},
		},
	},
	["常量配置"] = {
		["Type"] = {"string","lua","string#default",},
		["HeaderName"] = {"常量名","常量值","描述",},
		["Data"] = {
			[1] = {"FISHROD_ADDUP_LEN","0.5","竿长修正",},
		},
	},
	["物品配置表"] = {
		["Type"] = {"int#ukey","string","int","int","string#default",},
		["HeaderName"] = {"物品id","名称","等级","品质","图标id",},
		["Data"] = {
			[1] = {"10000","新手杆4H 3.6m","0","1","10001",},
			[2] = {"10001","鬼武者4H 3.6m","0","1","10001",},
			[3] = {"10002","鬼武者5H 3.6m","0","2","10001",},
			[4] = {"10003","鬼武者6H 3.6m","0","3","10001",},
			[5] = {"10004","鬼武者8H 3.6m","0","4","10001",},
			[6] = {"10005","鬼武者9H 3.6m","0","5","10001",},
			[7] = {"10006","鬼武者10H 3.6m","0","6","10001",},
		},
	},
}
