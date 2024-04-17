import { z } from "zod";

export type AdminBondFieldName =
    | "isin"
    | "space"
    | "description"
    | "entity"
    | "due_date"
    | "facial_rate"
    | "refund"
    | "differed"
    | "guarantee"
    | "total_number"
    | "type"
    | "period"

export type AdminBondFieldsType = 
    | "text"
    | "number"
    | "date"
    | "select"
    
const AddAdminBondSchema = z.object({
    isin: z.string().trim().min(2, {
      message: "Bond Isin is too short"
    }),
  
    space: z.string().trim().min(1, {
      message: 'Bond Space is required'
    }), 

    entity: z.string().trim().min(1, {
        message: 'Bond Entity is required'
    }),
  
    description : z.string().trim().optional(),
  
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
  
    guarantee: z.string().trim().min(1,{
        message: "Bond Guarantee is required"
    }),
  
    total_number: z.string().trim().min(1, {
        message: "Bond Total Number is required"
      }),

    type: z.string().trim().min(1,{
      message : "Bond Type is required"
    }),
    period: z.string().trim().min(1, {
      message: 'Bond Period is required'
    })
});

export default AddAdminBondSchema