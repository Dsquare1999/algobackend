"use client"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import { RiDeleteBin5Fill } from "react-icons/ri";
import { DotsHorizontalIcon } from "@radix-ui/react-icons"


import { Button } from "@/components/ui/button"  

export type HeaderProps = {
    rowId : string
    [key: string] : string
  }

type DeleteRowFunction = (id: string) => void;


export const Columns= (headers: string[], deleteRow: DeleteRowFunction): ColumnDef<HeaderProps>[] => {
    if (headers && headers.length > 0) {
        const headerColumns: ColumnDef<HeaderProps>[] = headers.map((header: string) => ({
            accessorKey: header,
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={header} />
            ),
        }));
        headerColumns.push({
            id: "actions",
            cell: ({ row }) => {
              const bondRow = row.original

              const handleDelete = () => {
                deleteRow(bondRow.rowId);
              };

              return (
                <Button variant="ghost" className="h-8 w-8 p-0" onClick={handleDelete}>
                  <span className="sr-only">Delete Row</span>
                  <RiDeleteBin5Fill className="h-4 w-4 text-destructive" />
                </Button>                
              )
            },
          },)
        return headerColumns;
    }
    return []    
};