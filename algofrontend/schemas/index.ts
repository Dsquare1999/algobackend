import * as z from "zod";

export const RegisterSchema = z.object({
    first_name: z.string().min(1, {
      message: "First name is required",
    }),
    last_name: z.string().min(1, {
      message: "Last name is required",
    }),
    email: z.string().email({
      message: "Email is required",
    }),
    password: z.string().min(6, {
      message: "Minimum 8 characters required",
    }),
    password2: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
    
}).refine((data) => data.password === data.password2, {
  message: "Passwords don't match",
  path: ["password2"],
});


export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const VerifySchema =  z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})


export { default as BondSchema} from './BondSchema'
export { default as AdminBondSchema } from './AdminBondSchema'