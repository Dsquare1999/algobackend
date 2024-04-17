import { CashflowProp } from "@/app/types/BondType"

interface CashflowProps{
    [date: string]: CashflowProp;
}

export const CashflowData = ( cashflows : CashflowProps, from : Date, to: Date | undefined) => {
    let cashflowValues : number[]= []
    const labels = Object.keys(cashflows).filter((dateString) => {
        const date = new Date(dateString);
        return to !== undefined ?  date >= from && date <= to : date == from 
    });
    labels.map((date) => {
        cashflowValues.push(cashflows[date].cashflow)
    })
    const datasets = [{
        label: `Cashflow`,
        data: cashflowValues,
        backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
    }];

    return {
        labels,
        datasets,
    };
};