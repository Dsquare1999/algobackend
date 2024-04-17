"use client"
import * as React from "react"
import {
  ColumnDef,
  RowData,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from "@/components/ui/table"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,  
} from "@/components/ui/form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { DataTablePagination } from "./DataTablePagination"
import { DataTableViewOptions } from "./DataTableViewOptions"
import { Button } from "@/components/ui/button"

import { v4 as uuidv4 } from 'uuid';
import { Input } from "@/components/ui/input"

import { BondSchema, AdminBondSchema } from "@/schemas";

import { BondFields } from "@/data/bondFields" 
import { AdminBondFields } from "@/data/AdminBondFields";

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  endpoint : string | undefined
  handleChange: (newData : TData[]) => void,
  addNewBond: (newBond : TData) => void,
}


export function DataTable<TData, TValue>({
  columns,
  data,
  endpoint,
  handleChange,
  addNewBond
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [editedCell, setEditedCell] = React.useState<{ rowId: string, columnId: string } | null>(null)
  const [inputValue, setInputValue] = React.useState<string>('');
  
  const getChoosenFields = (endpoint: string | undefined) => {
    if (endpoint === "bond") {
          return BondFields;
    } else {
        return AdminBondFields;
    }
  };

  const getChoosenSchema = (endpoint: string | undefined) => {
      if (endpoint === "bond") {
          return BondSchema;
      } else {
          return AdminBondSchema;
      }
  };

  const choosenFields = getChoosenFields(endpoint)
  const choosenSchema = getChoosenSchema(endpoint);

  const form = useForm<z.infer<typeof choosenSchema>>({
    resolver: zodResolver(choosenSchema),
  });
  
  const onAddBondSubmit = (values: z.infer<typeof choosenSchema>) => {
      console.log("Form Values", values)
      addNewBond(values as TData)
  };

  const handleCellEdit = (rowId: string, columnId: string, currentValue : string) => {
    setInputValue(currentValue)
    setEditedCell({ rowId, columnId });
  };

  const handleCellChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };


  const updateTableCells = () => {
    if(editedCell){
      const newData = data.map((row, index) => {
        if (index === parseInt(editedCell?.rowId)) {
          return {
            ...row,
            [editedCell.columnId]: inputValue
          };
        }
        return row;
      });
      handleChange(newData)
    }
    setEditedCell(null);
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })

  return (
    <div className="rounded-md border">
      <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onAddBondSubmit)}
      >
      <ScrollArea className="w-full whitespace-nowrap">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-foreground/10">
                {headerGroup.headers.map((header, headerIdx) => {
                  return (
                    <TableCell key={headerIdx + uuidv4()}>
                      
                      {header.isPlaceholder
                        ? null
                        : 
                        header.id !=="actions" ?
                        choosenFields.map((bond, bondIndex) => {
                          const SelectedBond = bond as typeof choosenFields[0]
                          return SelectedBond.name === header.id ? (
                            SelectedBond.type === "select" && SelectedBond.options ? (
                              <div className="relative" key={bondIndex}>
                                <select
                                  {...form.register(SelectedBond.name)} name={SelectedBond.name} id={SelectedBond.name}
                                  className="block appearance-none w-full min-w-[100px] bg-background border border-gray-300 hover:border-gray-400 px-2 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500"
                                >
                                  <option value="" disabled selected>
                                      Select {SelectedBond.name}
                                    </option>
                                  {SelectedBond.options.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                  ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                  <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414zM5 4a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              </div>
                            ) : bond.type === "number" ? (
                              <FormField
                                key={bondIndex}
                                control={form.control}
                                name={bond.name}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        type={bond.type}
                                        min={bond.min}
                                        placeholder={bond.placeholder}
                                        className="bg-background shadow"
                                      />
                                    </FormControl>
                                    <FormMessage /> 
                                  </FormItem>
                                )}
                              />
                            ) : (
                              <FormField
                                key={bondIndex}
                                control={form.control}
                                name={bond.name}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        type={bond.type}
                                        placeholder={bond.placeholder}
                                        className="bg-background shadow"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )
                          ) : null;
                        })
                          : 
                          <Button type="submit">Add</Button>
                        }
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {editedCell?.rowId === row.id && editedCell?.columnId === cell.column.id ? (
                        <input
                          type="text"
                          className="p-2 border rounded shadow"
                          value={inputValue}
                          onChange={(event : React.ChangeEvent<HTMLInputElement>) => handleCellChange(event)}
                          onBlur={updateTableCells}
                        />
                      ) : (
                        cell.column.id !== "actions" ? (<div  onClick={() => handleCellEdit(row.id, cell.column.id, (cell.row.original as Record<string, any>)[cell.column.id])}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>) : (<div>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>)

                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      </form>
      </Form>
      <div className="w-full flex items-center justify-between">
          <DataTablePagination table={table} />
          <DataTableViewOptions table={table} />
        </div>
    </div>
  )
}
