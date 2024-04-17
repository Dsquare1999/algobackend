"use client"
import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

import * as XLSX from 'xlsx';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaDeleteLeft } from "react-icons/fa6";

 

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";



import { Columns } from "../utils/datatable/column";
import { DataTable } from "../utils/datatable/dataTable";
import { HeaderProps } from "../utils/datatable/column";

import axios from "axios";

import { AdminBondFieldName } from "@/schemas/AdminBondSchema";
import { BondFields } from "@/data/bondFields"

interface SelectField {
  name: AdminBondFieldName;
  type: "select";
  placeholder: string;
  options: string[];
}

interface RowData {
  rowId : string
  [key: string]: any
}

interface SheetsProps {
  sheetId: string
  sheetName: string
  endpoint: string | null
  headers: string[]
  rows: RowData[]
  errors?: string[]
}

interface DataTableProps {
  fileId: string
  fileName: string
  sheets: SheetsProps[]
}

interface UploadProps {
  endpoint?: string
  isAdmin : boolean
  title?: string
  previsualize : (dataTableData: DataTableProps[], rejectedDataTableData : DataTableProps[], endpoint: string|undefined, isAdmin: boolean) => void;
}

const formSchema = z.object({
  file: z.string().optional(),
});

export default function UploadBond({endpoint, isAdmin, title, previsualize}: UploadProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // ---------------- States -------------------------------------------

  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  const [dataTableData, setDataTableData] = useState<DataTableProps[]>([])
  const [rejectedDataTableData, setRejectedDataTableData] = useState<DataTableProps[]>([])

  const acceptedSheetNames: string[] = ['bond', 'dat', 'dav', 'eib', 'pib', 'refi', 'customer_loan', 'op injection', 'op withdrawal']


  // -------------- Drag and Drop ---------------------------------------------------

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("File has been added");
    if (e.target.files && e.target.files.length > 0) {
      const fileList = Array.from(e.target.files);
      setFiles((prevState: File[]) => [...prevState, ...fileList]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileList = Array.from(e.dataTransfer.files);
      setFiles((prevState: File[]) => [...prevState, ...fileList]);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const openFileExplorer = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.click();
    }
  };

  const removeFile = (fileName: string, idx: number) => {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles(newArr);
  };

  

  // ----------------------  Control & Verification -----------------------------------------

  const isSheetNameAccepted = (sheetName: string): { status: boolean, acceptedSheetName: string | null } => {
    let endpoint : string = ""
    const found = acceptedSheetNames.some((eachAcceptedSheetName) => {
      if (sheetName.toLowerCase().includes(eachAcceptedSheetName)) {
        endpoint = eachAcceptedSheetName
        return true;
      }
      return false;
    });
  
    if (found) {
      return { status: true, acceptedSheetName: endpoint };
    } else {
      return { status: false, acceptedSheetName: null };
    }
  }
  
  let isinField: SelectField

  BondFields.map((field) =>{
    if(field.name == "isin"){
      isinField = field as SelectField
    }

  })

  const isValidRow = (row: RowData): { status: boolean, error: string } => {

    // isin checking
    if(!isAdmin && !isinField.options.includes(row.isin)){
      return {
          status: false,
          error: "Unknown Bond isin"
      };
    }
    
    // due date
    if (!isValidDate(row.due_date)) {
      return {
          status: false,
          error: "The date value is not valid"
      };
    }

    // facial rate
    if (row.facial_rate === undefined) {
        return {
            status: false,
            error: "Facial rate is missing"
        };
    }

    if (isNaN(row.facial_rate)) {
      return {
        status: false,
        error: "The facial rate is not a number"
      };
    }

    return {
      status: true,
      error: "Everything is great !"
    };
  };

  const isValidDate = (date: any): boolean => {
    return !isNaN(new Date(date).getTime());
  };

  // ---------------- Transform files -------------------------------------------------------- 

  const importExcel = async () => {

    const FilesDataTables: DataTableProps[] = []
    const RejectedFilesDataTables: DataTableProps[] = []

    files.forEach((this_file: File) => {
      const fileId = uuidv4()
      const Sheets: SheetsProps[] = []
      const RejectedSheets: SheetsProps[] = []

      if (this_file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const bstr = event.target?.result as string;
          const workBook = XLSX.read(bstr, { type: "binary" });

          workBook.SheetNames.forEach((thisWorkSheetName) => {
            const workSheetName = thisWorkSheetName;
            const workSheetId = uuidv4();

            const workSheet = workBook.Sheets[workSheetName];
            const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 }) as string[][];
            const headers: string[] = fileData[0] as string[];
            fileData.splice(0, 1);
            const thisSheetRows = convertToJson(headers, fileData);
            const rejectedRows: RowData[] = []
            const acceptedRows: RowData[] = []
            const errorsRows: string[] = []

            if(endpoint){
              thisSheetRows.forEach((row) => {
                if (!(isValidRow(row).status))   {
                  rejectedRows.push(row)
                  errorsRows.push(isValidRow(row).error)
                } else {
                  acceptedRows.push(row)
                }
              });
              Sheets.push({
                "sheetId": workSheetId,
                "endpoint": endpoint,
                "sheetName": workSheetName,
                "headers": headers,
                "rows": acceptedRows
              })
              RejectedSheets.push({
                "sheetId": workSheetId,
                "endpoint": endpoint,
                "sheetName": workSheetName,
                "headers": headers,
                "rows": rejectedRows,
                "errors": errorsRows
              })
            }else{
              if (isSheetNameAccepted(workSheetName).status) {
                const endpoint = isSheetNameAccepted(workSheetName).acceptedSheetName
  
                thisSheetRows.forEach((row) => {
                  if (!(isValidRow(row).status))   {
                    rejectedRows.push(row)
                    errorsRows.push(isValidRow(row).error)
                  } else {
                    acceptedRows.push(row)
                  }
                });
                Sheets.push({
                  "sheetId": workSheetId,
                  "endpoint": endpoint,
                  "sheetName": workSheetName,
                  "headers": headers,
                  "rows": acceptedRows
                })
                RejectedSheets.push({
                  "sheetId": workSheetId,
                  "endpoint": endpoint,
                  "sheetName": workSheetName,
                  "headers": headers,
                  "rows": rejectedRows,
                  "errors": errorsRows
                })
              } else {
                thisSheetRows.forEach((row) => {
                  rejectedRows.push(row);
                });
                RejectedSheets.push({
                  "sheetId": workSheetId,
                  "endpoint": null,
                  "sheetName": workSheetName,
                  "headers": headers,
                  "rows": rejectedRows
                })
              }
            }

            

          })

        };
        reader.readAsBinaryString(this_file);
      }
      FilesDataTables.push({
        "fileId": fileId,
        "fileName": this_file.name,
        "sheets": Sheets
      })
      RejectedFilesDataTables.push({
        "fileId": fileId,
        "fileName": this_file.name,
        "sheets": RejectedSheets
      })
    })
    console.log("FilesDataTables", FilesDataTables)
    setDataTableData(FilesDataTables)
    setRejectedDataTableData(RejectedFilesDataTables)
    setTimeout(() => {
      previsualize(FilesDataTables, RejectedFilesDataTables, endpoint, isAdmin);
    }, 1000)
    
  };

  const convertToJson = (headers: string[], data: any[][]) => {
    const rows: RowData[] = [];
    data.forEach((row: any[]) => {
      let rowData: RowData = {rowId: ''};
      row.forEach((element, index) => {
        if (!isNaN(element) && (headers[index] === "due_date" || headers[index] === "value_date")) {
          rowData[headers[index]] = convertToDate(element)
        } else if (headers[index] === "facial_rate") {
          rowData[headers[index]] = parseFloat(element);
        } else {
          rowData[headers[index]] = typeof element === 'string' ? element.trim() : element
        }
      });
      rowData['rowId'] = uuidv4();
      console.log("rowData --->", rowData);
      setTabledata(row)
      rows.push(rowData);
    });
    return rows;
  };

  const convertToDate = (due_date: number): string => {
    const millisecondsPerDay = due_date * 24 * 60 * 60 * 1000;

    const referenceDate = new Date(1900, 0, 1);
    const date = new Date(referenceDate.getTime() + millisecondsPerDay);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0'); 
    
    const formattedDate = `${year}-${month}-${day}`;
    
    return formattedDate;
  };

  const handlePrevisualize = useCallback(() => {
    // console.log('UploadBond dataTableData', JSON.stringify(dataTableData))
    previsualize(dataTableData, rejectedDataTableData, endpoint, isAdmin);
  }, [dataTableData, rejectedDataTableData])

  // ----------------------- Render the front -------------------------------------------------

  const [tableData, setTabledata] = useState<RowData[]>([]);

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-5 p-2">
      <Form {...form}>
        <form className="w-full" onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>

          <div
            className={`${dragActive ? "bg-blue-400" : "bg-blue-200"
            // className={`${dragActive ? "bg-foreground/50" : "bg-foreground/20"
              } p-4 w-full rounded-lg  min-h-[10rem] text-center flex flex-col items-center justify-center`}

            onDragEnter={handleDragEnter}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
          >
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="font-bold text-center underline text-lg text-black">{title? title : "Upload Portofolios"}</FormLabel>
                    <p className="text-sm text-black">
                      Drag & Drop files or{" "}
                      <span
                        className="font-bold text-blue-600 cursor-pointer"
                        onClick={openFileExplorer}
                      >
                        <u>Select files</u>
                      </span>{" "}
                      to upload
                    </p>
                    <p className="text-xs text-black">Allowed files: xlsx</p>
                    <FormControl>
                      <input
                        placeholder="fileInput"
                        className="hidden"
                        ref={inputRef}
                        type="file"
                        multiple={true}
                        onChange={handleChange}
                        accept=".xlsx, .xlsm, .xls, image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                      />
                    </FormControl>
                    <div className="flex flex-col items-center p-2">
                      {files.map((file, idx) => ( 
                        <div key={idx} className="flex flex-row space-x-5">
                          <span>  {file.name}   </span>
                          <span
                            className="text-red-500 cursor-pointer flex items-center justify-center"
                            onClick={() => removeFile(file.name, idx)}
                          >
                            <FaDeleteLeft />
                          </span>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex space-x-4">
              <Button type="button" onClick={importExcel} disabled={files.length === 0}>Previsualize Data</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
