--导出数据配置
--格式: {配置表的maker.lua,配置表名称.xlsx,生成配置文件名.lua}
--是否单独导出客户端配置/服务端配置，以maker的返回值为准
return {
	{"C_常量配置表.lua", 		"C_常量配置表.xlsx",		"const_cfg", "const_cfg.json"},
	{"W_物品配置表.lua", 		"W_物品配置表.xlsx",		"item_cfg", "item_cfg.json"},
	{"F_反馈配置表.lua", 		"F_反馈配置表.xlsx",		"feedback_cfg", "feedback_cfg.json"},
	{"Z_中文配置表.lua", 		"Z_中文配置表.xlsx",		"language_cfg", "language_cfg.json"},
	{"J_角色经验配置表.lua",	"J_角色经验配置表.xlsx",	"exp_cfg", "exp_cfg.json"},
	{"N_昵称配置表.lua", 		"N_昵称配置表.xlsx",		"name_cfg", "name_cfg.json"},
}