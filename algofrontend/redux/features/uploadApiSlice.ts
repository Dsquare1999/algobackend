import { BondSchema, AdminBondSchema } from '@/schemas';
import { apiSlice } from '../services/apiSlice';
import { z } from 'zod';


const uploadApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
        backoffice: builder.mutation({
            query: ({
                        isin,
                        space,
                        description,
                        entity,
                        due_date,
                        facial_rate,
                        refund, 
                        differed, 
                        guarantee,
                        total_number,
                        type,
                        period } : z.infer<typeof AdminBondSchema>) => ({
                url : '/backoffice/',
                method: 'POST',
                body : {isin, space, description, entity, due_date, facial_rate, refund, differed, guarantee, total_number, type, period}
            })
        }),
		bond: builder.mutation({
            query : ({
                        isin, 
                        outstanding, 
                        issuer,
                        value_date,
                        due_date,
                        facial_rate,
                        refund,
                        differed,
                        refinancing,
                        guarantee,
                        total_number,
                        number_available,
                        type,
                        period,
                        cotation,
                        reference_value } : z.infer<typeof BondSchema>)  =>({
                url: '/bond/',
                method: 'POST',
                body : {
                        isin, outstanding, issuer, value_date, due_date, facial_rate, refund, differed, refinancing, guarantee, 
                        total_number, number_available, type, period, cotation, reference_value
                    }

            })
        }),
        
	}),
});

export const {
    useBackofficeMutation,
    useBondMutation
} = uploadApiSlice;