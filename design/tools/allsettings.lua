--导出数据配置
--格式: {配置表的maker.lua,配置表名称.xlsx,生成配置文件名.lua}
--是否单独导出客户端配置/服务端配置，以maker的返回值为准
return {
	{"C_常量配置表.lua", 		"C_常量配置表.xlsx",		"const_cfg"},
	{"Y_元素配置表.lua", 		"Y_元素配置表.xlsx",		"element_cfg"},
	{"F_反馈配置表.lua", 		"F_反馈配置表.xlsx",		"feedback_cfg"},
	{"Z_中文配置表.lua", 		"Z_中文配置表.xlsx",		"language_cfg"},
	{"J_积分配置表.lua",		"J_积分配置表.xlsx",		"score_cfg"},
	{"N_昵称配置表.lua", 		"N_昵称配置表.xlsx",		"name_cfg"},
}