import { z } from "zod";

export type BondFieldName =
      "isin"
    | "outstanding"
    | "issuer"
    | "value_date"
    | "due_date"
    | "facial_rate"
    | "refund"
    | "differed"
    | "refinancing"
    | "guarantee"
    | "total_number"
    | "number_available"
    | "type"
    | "period"
    | "cotation"
    | "reference_value"

export type BondFieldsType = 
    | "text"
    | "number"
    | "date"
    | "select"
    
const BondSchema = z.object({
    isin: z.string().trim().min(2, {
      message: "Bond Isin is too short"
    }),
  
    outstanding: z.string().trim().min(1, {
      message: 'Bond Outstanding is required'
    }), 

    issuer: z.string().trim().min(1, {
        message: 'Bond Issuer is required'
    }),
  
    value_date: z.string().min(1,{
        message: "Bond Value Date is required"
    }),

    due_date: z.string().min(1,{
        message: "Bond Due Date is required"
    }),
  
    facial_rate: z.string().trim().min(1, {
        message: "Bond Facial Rate is required"
    }),
  
    refund: z.string().trim().min(1, {
      message: "Bond Refund is required"
    }),
  
    differed: z.string().trim().min(1, {
        message: "Bond Differed is required"
    }),

    refinancing: z.string().trim().min(1, {
      message: "Bond Refinancing is required"
    }),
  
    guarantee: z.string().trim().min(1,{
        message: "Bond Guarantee is required"
    }),
    
    total_number: z.string().trim().min(1, {
      message: "Bond Total Number is required"
    }),

    number_available: z.string().trim().min(1, {
        message: "Bond Available Number is required"
    }),

    type: z.string().trim().min(1,{
      message : "Bond Type is required"
    }),

    period: z.string().trim().min(1, {
      message: 'Bond Period is required'
    }),

    cotation: z.string().trim().min(1, {
      message: 'Bond Period is required'
    }),

    reference_value: z.string().optional()
});

export default BondSchema