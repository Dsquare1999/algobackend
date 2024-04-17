import { ValorisationProp } from "@/app/types/BondType"
import { useCallback, useEffect } from "react";

interface EconomicValuesProps {
    [date: string]: ValorisationProp;
}

export const EconomicValuesData = (economicValues: EconomicValuesProps, from : Date, to: Date | undefined, jump: string) => {
    let economicValuesFlatenningShock: number[] = []
    let economicValuesSteepeningShock: number[] = []
    let economicValuesMinus100bps: number[] = []
    let economicValuesPlus100bps: number[] = []
    let economicValuesShortRatesDown: number[] = []
    let economicValuesShortRatesUp: number[] = []

    const intJump = parseInt(jump)
    
    const allKeys = Object.keys(economicValues).filter((dateString) => {
        const date = new Date(dateString);
        return to !== undefined ?  date >= from && date <= to : date == from 
    });
    const labels = allKeys.filter((key, index) => index % intJump === 0);

    labels.map((date) => {
        economicValuesMinus100bps.push(economicValues[date].economicValue_minus_100bps)
        economicValuesPlus100bps.push(economicValues[date].economicValue_plus_100bps)
        economicValuesSteepeningShock.push(economicValues[date].economicValue_steepening_shock)
        economicValuesFlatenningShock.push(economicValues[date].economicValue_flatenning_shock)
        economicValuesShortRatesDown.push(economicValues[date].economicValue_short_rates_shock_down)
        economicValuesShortRatesUp.push(economicValues[date].economicValue_short_rates_shock_up)
    })

    const datasets = [
        {
            label: `Minus 100bps`,
            data: economicValuesMinus100bps,
            backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
        },
        {
            label: `Plus 100bps`,
            data: economicValuesPlus100bps,
            backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
        },
        {
            label: `Steepening Shock`,
            data: economicValuesSteepeningShock,
            backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
        },
        {
            label: `Flatenning Shock`,
            data: economicValuesFlatenningShock,
            backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
        },
        {
            label: `Short Rates Shock Down`,
            data: economicValuesShortRatesDown,
            backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
        },
        {
            label: `Short Rates Shock Up`,
            data: economicValuesShortRatesUp,
            backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
        },

    ];

    return {
        labels,
        datasets,
    };
};