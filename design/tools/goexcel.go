package main

import (
	"flag"
	"fmt"
	"github.com/xuri/excelize"
	"log"
	"os"
	"path/filepath"
	"strings"
)

var (
	srcPath  = flag.String("src", "", "import excel src data file path")
	dstPath  = flag.String("dst", "", "export excel src data file path")
	onlyfile = flag.String("olf", "", "import only this excel src data file name")
)

var filenamech = make(chan string)

func main() {
	flag.Parse()

	//print("parse only one data file:", *onlyfile)
	go func() {
		defer close(filenamech)
		filepath.Walk(*srcPath, walkFunc)
	}()

	for fileName := range filenamech {
		if *onlyfile != "" {
			if *onlyfile != fileName {
				continue
			}
		}
		srcFileName := *srcPath + fileName
		dstFileName := *dstPath + fileName + ".lua"
		xlsx, err := excelize.OpenFile(srcFileName)
		if err != nil {
			fmt.Println(err)
			return
		}
		fmt.Printf("start parsing file: %s\n", srcFileName)
		parseAllSheets(xlsx, dstFileName)
	}
}

//walk function
func walkFunc(path string, info os.FileInfo, err error) error {
	if err != nil {
		panic(err)
	}
	isdir := info.IsDir()
	name := info.Name()

	if isdir {
		return nil
	}

	if !strings.HasSuffix(name, ".xlsx") {
		return nil
	}

	if strings.HasPrefix(name, "~") {
		return nil
	}
	//fmt.Printf("path: %s, name: %s\n", path, name)
	filenamech <- name

	return nil
}

func parseAllSheets(f *excelize.File, dstFileName string) {
	wf, err := os.OpenFile(dstFileName, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0666)
	if err != nil {
		log.Fatalf("create file: %s error: %v", dstFileName, err)
	}
	defer wf.Close()

	fmt.Fprintln(wf, "return {")
	for _, sheetName := range f.GetSheetMap() {
		//fmt.Printf("parsing sheet: %s\n", sheetName)
		rows := f.GetRows(sheetName)

		//single sheet data
		fmt.Fprintf(wf, "\t[\"%s\"] = {\n", sheetName)
		hasData := false
		dataRowNum := 0
		dataEnd := false
		typeNum := 0
		for idx, row := range rows {
			if idx == 0 { //type
				fmt.Fprintf(wf, "\t\t[\"%s\"] = {", "Type")
				for _, colCell := range row {
					if colCell == "" {
						break
					} else {
						typeNum++
						fmt.Fprintf(wf, "\"%s\",", colCell)
					}
				}
				fmt.Fprintln(wf, "},")
			} else if idx == 1 { //header name
				fmt.Fprintf(wf, "\t\t[\"%s\"] = {", "HeaderName")
				for i := 0; i < typeNum; i++ {
					colCell := row[i]
					fmt.Fprintf(wf, "\"%s\",", colCell)
				}
				fmt.Fprintln(wf, "},")
			} else { // row data
				if idx == 2 {
					hasData = true
					//data begin
					fmt.Fprintf(wf, "\t\t[\"%s\"] = {\n", "Data")
				}

				rowHasData := false
				//all are empty, data end
				emptyNum := 0
				for i := 0; i < typeNum; i++ {
					if row[i] == "" {
						emptyNum++
					}
				}
				if emptyNum == typeNum {
					dataEnd = true
				} else {
					for i := 0; i < typeNum; i++ {
						colCell := row[i]
						colCell = strings.Replace(colCell, "\"", "\\\"", -1)
						if i == 0 {
							// if colCell == "" { //first key is empty,quit. data end
							// 	dataEnd = true
							// 	break
							// } else {
							dataRowNum++
							rowHasData = true
							fmt.Fprintf(wf, "\t\t\t[%d] = {", dataRowNum)
							// }
						}
						colCell = strings.Replace(colCell, "\n", "", -1)
						fmt.Fprintf(wf, "\"%s\",", colCell)
					}
					if rowHasData {
						fmt.Fprintln(wf, "},")
					}
				}

				if dataEnd {
					break
				}
			}
		}
		//data end
		if hasData {
			fmt.Fprintln(wf, "\t\t},")
		}
		// sheet end
		fmt.Fprintln(wf, "\t},")
	}
	fmt.Fprintln(wf, "}")
}
