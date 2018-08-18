rem @chcp 65001
@chcp 936
call clearoldcfg.bat
call makedata.bat
lua.exe main.lua
