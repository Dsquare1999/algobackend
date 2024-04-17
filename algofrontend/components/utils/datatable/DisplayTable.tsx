import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { useState } from "react"
import { DataTable } from "./dataTable"
import { Columns } from "./column"
import { AdminBondFieldName } from "@/schemas/AdminBondSchema";
import { BondFields } from "@/data/bondFields"

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
  
type Props = {
    FilesDataTables : DataTableProps[] 
    RejectedFilesDataTables : DataTableProps[]
    endpoint: string | undefined
    isAdmin: boolean
    updateData : (dataTableData: DataTableProps[], rejectedDataTableData : DataTableProps[]) => void;
}

interface SelectField {
  name: AdminBondFieldName;
  type: "select";
  placeholder: string;
  options: string[];
}



export const DispalyTable = ({FilesDataTables, RejectedFilesDataTables, endpoint, isAdmin, updateData}: Props) => {
    
    const [dataTableData, setDataTableData] = useState<DataTableProps[]>(FilesDataTables)
    const [rejectedDataTableData, setRejectedDataTableData] = useState<DataTableProps[]>(RejectedFilesDataTables)

    // -------------------

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

    // ------------------ Managing Json Files --------------------------------------------

  const deleteRow = (rowId: string, fileId: string, sheetId: string, rejected:boolean) => {
    const choosenDataTable = rejected ? rejectedDataTableData : dataTableData
    const updatedDataTables = choosenDataTable.map((dataTable) => {
      if (dataTable.fileId === fileId) {
        const updatedSheets = dataTable.sheets.map((sheet) => {
          if (sheet.sheetId === sheetId) {
            const updatedRows = sheet.rows.filter((row) => row.rowId !== rowId);
            return { ...sheet, rows: updatedRows };
          }
          return sheet;
        });
        return { ...dataTable, sheets: updatedSheets };
      }
      return dataTable;
    });
  
    rejected ? setRejectedDataTableData(updatedDataTables) : setDataTableData(updatedDataTables)

    setTimeout(() => {
      updateData(dataTableData, rejectedDataTableData);
    }, 1000)
  };

  const updateValue = (newData: RowData[], fileId: string, sheetId: string, rejected:boolean) => {

    const rejectedRows: RowData[] = []
    const acceptedRows: RowData[] = []
    let mergedRows : RowData[] = []
    const errorsRows: string[] = []

    newData.forEach((row) => {
      if (!(isValidRow(row).status))   {
        rejectedRows.push(row)
        errorsRows.push(isValidRow(row).error)
      } else {
        acceptedRows.push(row)
      }
    });

    const updatedDataTables = dataTableData.map((dataTable) => {
      if (dataTable.fileId === fileId) {
        const updatedSheets = dataTable.sheets.map((sheet) => {

          if (sheet.sheetId === sheetId) {
            mergedRows = rejected ? sheet.rows.concat(acceptedRows) : acceptedRows 
            return { ...sheet, rows: mergedRows };
          }
          return sheet;
        });
        return { ...dataTable, sheets: updatedSheets };
      }
      return dataTable;
    });

    const rejectedUpdatedDataTables = rejectedDataTableData.map((dataTable) => {
      if (dataTable.fileId === fileId) {
        const updatedSheets = dataTable.sheets.map((sheet) => {

          if (sheet.sheetId === sheetId) {
            mergedRows = rejected ? rejectedRows : sheet.rows.concat(rejectedRows)
            return { ...sheet, rows: mergedRows, errors: errorsRows };
          }
          return sheet;
        });
        return { ...dataTable, sheets: updatedSheets };
      }
      return dataTable;
    });
  
    setDataTableData(updatedDataTables);
    setRejectedDataTableData(rejectedUpdatedDataTables);


    setTimeout(() => {
      updateData(updatedDataTables, rejectedUpdatedDataTables);
    }, 1000)
  };

  const addNewRow = (newData: RowData, fileId: string, sheetId: string) => {
    let rejectedRow: RowData
    let acceptedRow: RowData
    let mergedRows : RowData[] = []

    if (!(isValidRow(newData).status))   {
      rejectedRow = newData 
      let errorsRow = isValidRow(newData).error

      const rejectedUpdatedDataTables = rejectedDataTableData.map((dataTable) => {
        if (dataTable.fileId === fileId) {
          const updatedSheets = dataTable.sheets.map((sheet) => {
            if (sheet.sheetId === sheetId) {
              const mergedRows = sheet.rows.concat(rejectedRow);

              let mergedErrors: string[] = [];
              if (Array.isArray(sheet.errors) && sheet.errors.every(error => typeof error === "string")) {
                mergedErrors = sheet.errors.concat([errorsRow]);
              }
              return { ...sheet, rows: mergedRows, errors: mergedErrors };
            }
            return sheet;
          });
          return { ...dataTable, sheets: updatedSheets };
        }
        return dataTable;
      });
      setRejectedDataTableData(rejectedUpdatedDataTables);

    } else {
      acceptedRow = newData

      const updatedDataTables = dataTableData.map((dataTable) => {
        if (dataTable.fileId === fileId) {
          const updatedSheets = dataTable.sheets.map((sheet) => {
  
            if (sheet.sheetId === sheetId) {
              mergedRows = sheet.rows.concat(acceptedRow) 
              return { ...sheet, rows: mergedRows };
            }
            return sheet;
          });
          return { ...dataTable, sheets: updatedSheets };
        }
        return dataTable;
      });
      setDataTableData(updatedDataTables);

    }

    setTimeout(() => {
      updateData(dataTableData, rejectedDataTableData);
    }, 1000)
  }

    return ( 
        <div className="flex space-x-6">
            <Tabs defaultValue="accepted">
              <TabsList className="grid grid-cols-2 ">
                  <TabsTrigger value="accepted">Accepted</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
              <TabsContent value="accepted" className="w-[80vw]">
              {/* <TabsContent value="accepted" className="w-full"> */}
              {
                
                dataTableData.map((dataTable) => (
                  <div key={dataTable.fileName} className="">
                    <h3 className="text-sm mb-2 text-right"><span className="underline font-bold">File Name:</span> {dataTable.fileName}</h3>
                    {
                      dataTable.sheets && dataTable.sheets.length > 0 ? (
                        <Tabs defaultValue={dataTable.sheets[0].sheetName} className="">
                          <TabsList>
                            {dataTable.sheets.map((sheet) => (
                              <TabsTrigger key={sheet.sheetName} value={sheet.sheetName}>{sheet.sheetName}</TabsTrigger>
                            ))}
                          </TabsList>
                          {dataTable.sheets.map((sheet) => (
                            <TabsContent key={sheet.sheetName} value={sheet.sheetName}>
                              <DataTable columns={Columns(sheet.headers, (rowId) => deleteRow(rowId, dataTable.fileId, sheet.sheetId, false))} 
                                          data={sheet.rows} 
                                          endpoint={endpoint}
                                          handleChange={(newData : RowData[]) => updateValue(newData, dataTable.fileId, sheet.sheetId, false)} 
                                          addNewBond={(newRow) => addNewRow(newRow, dataTable.fileId, sheet.sheetId)} />
                              
                            </TabsContent>
                          ))}
                        </Tabs>
                      ) : (

                        <div>No bonds available</div>

                      )
                    }
                  </div>
                ))

              }
              </TabsContent>
              <TabsContent value="rejected" className="w-[80vw]">
              {/* <TabsContent value="rejected" className="w-full"> */}
              {
                
                rejectedDataTableData.map((dataTable) => (
                  <div key={dataTable.fileName}>
                    
                    <h3 className="text-sm mb-2 text-right"><span className="underline font-bold">File Name:</span> {dataTable.fileName}</h3>
                    {
                      dataTable.sheets && dataTable.sheets.length > 0 ? (
                        <Tabs defaultValue={dataTable.sheets[0].sheetName} className="">
                          <TabsList>
                            {dataTable.sheets.map((sheet) => (
                              <TabsTrigger key={sheet.sheetName} value={sheet.sheetName}>{sheet.sheetName}</TabsTrigger>
                            ))}
                          </TabsList>
                          {dataTable.sheets.map((sheet) => (
                            <TabsContent key={sheet.sheetName} value={sheet.sheetName}>
                              <DataTable columns={Columns(sheet.headers, (rowId) => deleteRow(rowId, dataTable.fileId, sheet.sheetId, true))} 
                                          data={sheet.rows} 
                                          endpoint={endpoint}
                                          handleChange={(newData : RowData[]) => updateValue(newData, dataTable.fileId, sheet.sheetId, true)} 
                                          addNewBond={(newRow) => addNewRow(newRow, dataTable.fileId, sheet.sheetId)}/>
                            </TabsContent>
                          ))}
                        </Tabs>
                      ) : (

                        <div>No bonds available</div>

                      )
                    }
                  </div>
                ))
              }
              </TabsContent>
          </Tabs>
    
      
      </div>
    );
}