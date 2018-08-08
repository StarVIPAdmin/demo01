@echo off
rem @chcp 65001
@chcp 936
set /p file="enter file name: "
call makedata_one.bat %file%
lua.exe main.lua %file%
pause