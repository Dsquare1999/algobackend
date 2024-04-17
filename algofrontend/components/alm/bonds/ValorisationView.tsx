"use client"
import { Line } from "@/components/charts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ValorisationProp } from "@/app/types/BondType";
import { ValorisationData } from "@/data/ValorisationData";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useState } from "react";

interface ValorisationViewProps {
    due_date: string
    value_date: string
    valorisations: {
        [date: string]: ValorisationProp
    }
}

const ValorisationView: React.FunctionComponent<ValorisationViewProps> = ({ due_date, value_date, valorisations }) => {
    const [jump, setJump] = useState<string>("30")
    const [from, setFrom] = useState<Date>(new Date())

    const value_date_labels = Object.keys(valorisations)
    const last_value_date = new Date(value_date_labels[value_date_labels.length - 1])

    const [to, setTo] = useState<Date | undefined>(new Date(last_value_date.setDate(last_value_date.getDate() + 4)))

    const [comparedFrom, setComparedFrom] = useState<Date | undefined>(undefined)
    const [comparedTo, setComparedTo] = useState<Date | undefined>(undefined)

    return (
        <Card>
            <CardHeader className="pb-2 flex flex-row">

                <div className="flex-1">
                    <CardDescription>Valorisations</CardDescription>
                    <CardTitle className="text-2xl">${ValorisationData(valorisations, from, to, jump).datasets[0].data.reduce((acc, curr) => acc + curr, 0).toFixed(2)}</CardTitle>
                </div>
                <div className="flex flex-1">
                    <div className="flex flex-col">
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
                        <div className="flex-1">
                            <Select
                                onValueChange={(value) => setJump(value)}
                                defaultValue="30"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Monthly Display" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="360">Yearly</SelectItem>
                                    <SelectItem value="180">Half-yearly</SelectItem>
                                    <SelectItem value="90">Quaterly</SelectItem>
                                    <SelectItem value="30">Monthly</SelectItem>
                                    <SelectItem value="7">Weekly</SelectItem>
                                    <SelectItem value="1">Daily</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-[9px] text-muted-foreground">
                    Sum of Valorisations {(to !== undefined && to.toLocaleDateString() !== from.toLocaleDateString()) ? `on period ${from.toLocaleDateString()} - ${to.toLocaleDateString()}` : `on day ${from.toLocaleDateString()}`}
                </div>
            </CardContent>
            {
                ValorisationData(valorisations, from, to, jump).datasets[0].data.reduce((acc, curr) => acc + curr, 0) > 0 &&
                (<div className="w-full flex flex-col space-y-2">
                    {
                        comparedFrom !== undefined && comparedTo !== undefined && (
                            <div className="w-full">
                                <Line data={ValorisationData(valorisations, comparedFrom, comparedTo, jump)} title={`Bond Valorisation Drops Comparison: ${comparedFrom.toDateString()} - ${comparedTo.toDateString()}`} />
                            </div>
                        )
                    }
                    <div className="w-full">
                        <Line data={ValorisationData(valorisations, from, to, jump)} title={`Bond Valorisation Drops: ${from.toDateString()} ${to !== undefined && to.toLocaleDateString() !== from.toLocaleDateString() ? ' - ' + to.toDateString() : ''}`} />
                    </div>
                </div>)
            }
        </Card>
    );
}

export default ValorisationView;