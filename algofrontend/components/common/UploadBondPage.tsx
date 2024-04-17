'use client'

import { useCallback, useEffect, useState } from "react";
import UploadBond from "./UploadBond";
import { Button } from "../ui/button";
import { DispalyTable } from "../utils/datatable/DisplayTable";

import axios from "axios";

import { IoIosArrowRoundBack } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

import { useBondMutation, useBackofficeMutation } from "@/redux/features/uploadApiSlice";
import { toast } from "react-toastify";

import { AdminBondSchema, BondSchema } from "@/schemas";


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

  interface UploadBondPageProps {
    isAdminPage ?: boolean
  }

  type endpointProps= | "backoffice"
                      | "bond"


const UploadBondPage = ({isAdminPage} : UploadBondPageProps) => {
    const [isAdmin, setIsAdmin] = useState<boolean>(isAdminPage? isAdminPage:false)
    const [isDisplayed, setIsDisplayed] = useState<boolean>(false)
    const [endpoint, setEndpoint] = useState<string | undefined>("")
    const [dataTableData, setDataTableData] = useState<DataTableProps[]>([])
    const [rejectedDataTableData, setRejectedDataTableData] = useState<DataTableProps[]>([])

    
    const [bond] = useBondMutation()
    const [backoffice] = useBackofficeMutation()

    const previsualizeData = useCallback(
      (
        receivedDataTableData: DataTableProps[],
        receivedRejectedDataTableData: DataTableProps[],
        receivedEndpoint: string | undefined,
        receivedIsAdmin: boolean
      ) => {
        console.log("ReceivedDataTableData", receivedDataTableData) 
        console.log("RejectedReceivedDataTableData", receivedRejectedDataTableData) 

        setIsAdmin(receivedIsAdmin);
        setEndpoint(receivedEndpoint);
        setDataTableData(receivedDataTableData);
        setRejectedDataTableData(receivedRejectedDataTableData);  
        changeDisplaying()
      },
      [isDisplayed]
    );

    // A revoir 
    const updateData = (
      receivedDataTableData: DataTableProps[],
      receivedRejectedDataTableData: DataTableProps[],
    ) => {
      setDataTableData(receivedDataTableData);
      setRejectedDataTableData(receivedRejectedDataTableData);  
    }
  
    const changeDisplaying = useCallback(() => {
      setIsDisplayed((prevIsDisplayed) => !prevIsDisplayed);
    }, [isDisplayed]);
  
    useEffect(() => {
      if (isDisplayed) {
        
      }
    }, [isDisplayed]);

  // ------------------- Sumbmit function -----------------------------------------------

  const submitBonds = async () => {
    let submitEndpoint = ""
    dataTableData.map((dataTable: DataTableProps) => {
      if (dataTable.sheets && dataTable.sheets.length > 0) {
        dataTable.sheets.map((sheet) => { 

          try {
            if(!isAdmin){
              submitEndpoint = endpoint ? endpoint : sheet.endpoint ? sheet.endpoint : "backoffice"
            }else{
              submitEndpoint = 'backoffice'
            }
  
            sheet.rows.map(async (row) => {
              await upload(endpoint as endpointProps, row)
              // const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/v1/${submitEndpoint}/`, row);
              // console.log(response)
            })
          } catch (error) {
            console.log("Something went wrong here ... : ", error)
          }

        })
      }
    })
  }

  const upload = async (endpoint: endpointProps, row: any) => {
    endpoint === 'bond' ? bond(row).unwrap()
                            .then((res: any) => {toast.success('Bond Successful Upload')})
                            .catch((error:any) => {toast.error('Error Uploading Bond')}) : 
    endpoint === 'backoffice' ? backoffice(row).unwrap()
                            .then((res: any) => {toast.success('Admin Bond Successful Upload')})
                            .catch((error:any) => {toast.error('Error Uploading Bond')}) : 
    null
  }

    return ( 
        <div>
        {
            isDisplayed  ? (
                <div className="">
                    <div className="flex justify-end items-center space-x-2 mb-4">
                        <Button type="button" onClick={changeDisplaying}> 
                          <span className="mr-2 w-4 h-4"><IoIosArrowRoundBack /></span>
                          Back
                        </Button>
                        <Button type="button" onClick={submitBonds}> 
                          <span className="mr-2 w-4 h-4"><IoCloudUploadOutline /></span>
                          Upload Bonds
                        </Button>
                    </div>
                    <DispalyTable FilesDataTables={dataTableData} RejectedFilesDataTables={rejectedDataTableData} endpoint={endpoint} isAdmin={isAdmin} updateData={(dataTableData, rejectedDataTableData) => updateData(dataTableData, rejectedDataTableData)} />
                    {/* <ScrollBar orientation="horizontal" /> */}
                </div>
            ) : (
                <div className="h-full w-full p-1">
                    <div>
                        <UploadBond isAdmin={isAdmin} previsualize={(dataTableData, rejectedDataTableData, endpoint, isAdmin) => previsualizeData(dataTableData, rejectedDataTableData, endpoint, isAdmin)}/>
                    </div>
                    <div className="w-full flex flex-wrap">
                        <div className="flex">
                            <UploadBond endpoint="bond" isAdmin={isAdmin} title="Bond Portofolio" previsualize={(dataTableData, rejectedDataTableData, endpoint, isAdmin) => previsualizeData(dataTableData, rejectedDataTableData, endpoint, isAdmin)} />
                            <UploadBond endpoint="customer_loan" isAdmin={isAdmin} title="Customer Loans Portofolio" previsualize={(dataTableData, rejectedDataTableData, endpoint, isAdmin) => previsualizeData(dataTableData, rejectedDataTableData, endpoint, isAdmin)}/>
                        </div>
                        <div className="flex">
                            <UploadBond endpoint="eib" isAdmin={isAdmin} title="EIB Portofolio" previsualize={(dataTableData, rejectedDataTableData, endpoint, isAdmin) => previsualizeData(dataTableData, rejectedDataTableData, endpoint, isAdmin)}/>
                            <UploadBond endpoint="pib" isAdmin={isAdmin} title="PIB Portofolio" previsualize={(dataTableData, rejectedDataTableData, endpoint, isAdmin) => previsualizeData(dataTableData, rejectedDataTableData, endpoint, isAdmin)}/>
                        </div>
                        <div className="flex">
                            <UploadBond endpoint="dat" isAdmin={isAdmin} title="DAT Portofolio" previsualize={(dataTableData, rejectedDataTableData, endpoint, isAdmin) => previsualizeData(dataTableData, rejectedDataTableData, endpoint, isAdmin)}/>
                            <UploadBond endpoint="refi" isAdmin={isAdmin} title="Refi Portofolio" previsualize={(dataTableData, rejectedDataTableData, endpoint, isAdmin) => previsualizeData(dataTableData, rejectedDataTableData, endpoint, isAdmin)}/>
                        </div>
                        <div className="flex">
                            <UploadBond endpoint="op_injection" isAdmin={isAdmin} title="OP Injection Portofolio" previsualize={(dataTableData, rejectedDataTableData, endpoint, isAdmin) => previsualizeData(dataTableData, rejectedDataTableData, endpoint, isAdmin)}/>
                            <UploadBond endpoint="op_retrait" isAdmin={isAdmin} title="OP Retrait Portofolio" previsualize={(dataTableData, rejectedDataTableData, endpoint, isAdmin) => previsualizeData(dataTableData, rejectedDataTableData, endpoint, isAdmin)}/>
                        </div>
                        
                    </div>
                </div>
            )
        }
        
        </div>
     );
}
 
export default UploadBondPage;