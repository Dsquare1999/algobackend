import { DurationProp } from "@/app/types/BondType"

interface DurationDataProps{
    [date: string]: DurationProp;
}

export const DurationData = ( durations : DurationDataProps, from : Date, to: Date | undefined, jump: string) => {
    const intJump = parseInt(jump)
    let durationValues: number[]= []
    
    const allKeys = Object.keys(durations).filter((dateString) => {
        const date = new Date(dateString);
        return to !== undefined ?  date >= from && date <= to : date == from 
    });
    const labels = allKeys.filter((key, index) => index % intJump === 0);

    labels.map((date) => {
        durationValues.push(durations[date].duration_macaulay)
    })
    const datasets = [{
        label: `Duration Macaulay`,
        data: durationValues,
        backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
    }];

    return {
        labels,
        datasets,
    };
};