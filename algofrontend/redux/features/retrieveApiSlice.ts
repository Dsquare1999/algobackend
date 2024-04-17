import { AdminBondSchema, BondSchema } from "@/schemas";
import { apiSlice } from "../services/apiSlice";

const retrieveApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        retrieveBond : builder.query<typeof BondSchema, void>({
            query: () => '/bond/'
        }),
        retrieveBondPortofolio: builder.query<any, void>({
            query: () => '/bond_portofolio/'
        }),
        retrieveBilan: builder.query<any, void>({
            query:() => '/bilan/'
        })
    })
})

export const {
    useRetrieveBondQuery,
    useRetrieveBondPortofolioQuery,
    useRetrieveBilanQuery

} = retrieveApiSlice