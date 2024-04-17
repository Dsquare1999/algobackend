'use client'
import { Bar } from "@/components/charts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { CashflowProp } from "@/app/types/BondType";
import { CashflowData } from "@/data/CashflowsData";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useCallback, useState } from "react";


interface CashflowViewProps {
    due_date : string
    value_date : string
    cashflows: {
        [date: string]: CashflowProp;
    };
}
 
const CashflowView: React.FunctionComponent<CashflowViewProps> = ({due_date, value_date, cashflows}) => {
    const [from, setFrom] = useState<Date>(new Date())

    const value_date_labels = Object.keys(cashflows)
    const last_value_date = new Date(value_date_labels[value_date_labels.length - 1])

    const [to, setTo] = useState<Date | undefined>(new Date(last_value_date.setDate(last_value_date.getDate() + 4)))

    const [comparedFrom, setComparedFrom] = useState<Date | undefined>(undefined)
    const [comparedTo, setComparedTo] = useState<Date | undefined>(undefined)

    return ( 
        <Card>
            <CardHeader className="pb-2 flex flex-row space-x-4 items-center">
                <div className="flex-1">
                    <CardDescription>Cashflows</CardDescription>
                    <CardTitle className="text-2xl">${CashflowData(cashflows, from, to).datasets[0].data.reduce((acc, curr) => acc + curr, 0) }</CardTitle>
                </div>
                <div className="flex-1">
                    <DateRangePicker
                        onUpdate={(values) => {
                                console.log("Values", values)
                                setFrom(values.range.from)
                                setTo(values.range.to)
                                setComparedFrom(values.rangeCompare?.from)
                                setComparedTo(values.rangeCompare?.to)
                            }}
                        initialDateFrom={new Date(value_date)}
                        initialDateTo={to}
                        align="start"
                        locale="en-GB"
                        showCompare={true}
                    />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-[9px] text-muted-foreground">
                    Sum of cashflows { (to !== undefined && to.toLocaleDateString() !== from.toLocaleDateString()) ? `on period ${from.toLocaleDateString()} - ${to.toLocaleDateString()}` : `on day ${from.toLocaleDateString()}`}
                </div>
            </CardContent>
            {
                CashflowData(cashflows, from, to).datasets[0].data.reduce((acc, curr) => acc + curr, 0) > 0 &&
                (<div className="w-full flex flex-col space-y-2">
                    {
                        comparedFrom !== undefined && comparedTo !== undefined && (
                            <div className="w-full">
                                <Bar data={CashflowData(cashflows, comparedFrom, comparedTo)} title={`Bond Cashflows Drops Comparison: ${comparedFrom.toDateString()} - ${comparedTo.toDateString()}`} />
                            </div>
                        )
                    }
                <div className="w-full">
                    <Bar data={CashflowData(cashflows, from, to)} title={`Bond Cashflows Drops: ${from.toDateString()} ${to !== undefined &&  to.toLocaleDateString() !== from.toLocaleDateString() ? ' - ' + to.toDateString() : ''}`} />         
                </div>
                </div>)
            }
            
        </Card>
     );
}

export default CashflowView;