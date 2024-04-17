import { DurationProp } from "@/app/types/BondType"

interface DurationEncoursDataProps{
    [date: string]: DurationProp;
}

export const DurationEncoursData = ( durations : DurationEncoursDataProps, from : Date, to: Date | undefined, jump: string) => {
    const intJump = parseInt(jump)
    let durationEncoursValues: number[]= []
    
    const allKeys = Object.keys(durations).filter((dateString) => {
        const date = new Date(dateString);
        return to !== undefined ?  date >= from && date <= to : date == from 
    });
    const labels = allKeys.filter((key, index) => index % intJump === 0);

    labels.map((date) => {
        durationEncoursValues.push(durations[date].duration_encours)
    })
    const datasets = [{
        label: `Duration Macaulay * Encours`,
        data: durationEncoursValues,
        backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
    }];

    return {
        labels,
        datasets,
    };
};