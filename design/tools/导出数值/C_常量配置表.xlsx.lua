return {
	["导出"] = {
		["Type"] = {"string","string","string#default",},
		["HeaderName"] = {"字段名","变量名","导出端",},
		["Data"] = {
			[1] = {"属性id","AttrId","",},
			[2] = {"属性名","AttrName","",},
			[3] = {"属性值","AttrValue","",},
		},
	},
	["常量配置"] = {
		["Type"] = {"string","lua","string#default",},
		["HeaderName"] = {"常量名","常量值","描述",},
		["Data"] = {
			[1] = {"MAX_TOTAL_WEIGHT","99999999","最大重量值",},
			[2] = {"FIRST_CHAPTERID","0","第一个章节id",},
			[3] = {"BASE_AIR_PRESSURE","{970,1040}","基准气压范围",},
			[4] = {"MIN_BUOY_DEPTH","10","最小钓深",},
		},
	},
	["属性"] = {
		["Type"] = {"int#ukey","string","int",},
		["HeaderName"] = {"属性id","属性名","属性值",},
		["Data"] = {
			[1] = {"1","体力","10",},
			[2] = {"2","耐力","20",},
			[3] = {"3","命中率","30",},
			[4] = {"4","闪避率","40",},
			[5] = {"5","暴击率","50",},
			[6] = {"6","抗暴击率","60",},
		},
	},
}
