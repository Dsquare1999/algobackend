import { ValorisationProp } from "@/app/types/BondType"

interface ValorisationDataProps{
    [date: string]: ValorisationProp;
}

export const ValorisationData = ( valorisations : ValorisationDataProps, from : Date, to: Date | undefined, jump: string) => {
    const intJump = parseInt(jump)
    let valorisationValues: number[]= []
    
    const allKeys = Object.keys(valorisations).filter((dateString) => {
        const date = new Date(dateString);
        return to !== undefined ?  date >= from && date <= to : date == from 
    });
    const labels = allKeys.filter((key, index) => index % intJump === 0);
    
    labels.map((date) => {
        valorisationValues.push(valorisations[date].valorisation)
    })
    const datasets = [{
        label: `Valorisation`,
        data: valorisationValues,
        backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
    }];

    return {
        labels,
        datasets,
    };
};