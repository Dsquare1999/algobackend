export type CashflowProp = {
    amortization: number
    cashflow: number
    differed_remaining: number
    interest: number
}

export type ValorisationProp = {
    valorisation : number
    net_interest : number
    economicValue_plus_100bps : number
    economicValue_minus_100bps: number
    economicValue_steepening_shock: number
    economicValue_flatenning_shock: number
    economicValue_short_rates_shock_up: number
    economicValue_short_rates_shock_down: number
}

export type DurationProp = {
    duration_macaulay: number
    duration_encours: number
}

export type BondProp = {
    id: string,
    annual_coupon: number,
    isin: string,
    outstanding: number,
    issuer: string,
    value_date: string,
    due_date: string,
    facial_rate: number,
    refund: string,
    differed: number,
    refinancing: string,
    guarantee: string,
    total_number: number,
    number_available: number,
    type: string,
    period: string,
    cotation: string,
    reference_value: 0,
    cashflows: {
        [date : string] : CashflowProp
    },
    valorisations : {
        [date : string] : ValorisationProp
    }
    duration_macaulay:{
        [date: string]: DurationProp
    }
    user: number,
    portofolio: string
}