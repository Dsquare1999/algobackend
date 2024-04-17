"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { ToastAction } from "@/components/ui/toast"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator
} from "@/components/ui/input-otp"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

import axios from "axios"

import { VerifySchema } from "@/schemas"

export function InputOTPForm() {
    const router = useRouter()
  const form = useForm<z.infer<typeof VerifySchema>>({
    resolver: zodResolver(VerifySchema),
    defaultValues: {
        otp: "",
    },
  })

  const TryAgain = () => {
    router.push('/register')
  }

  async function onSubmit(data: z.infer<typeof VerifySchema>) {

    await axios.post('http://localhost:8000/api/v1/auth/verify-email/', data)
        .then(({data} : {data : { message : string}}) => {
                toast({
                    title: "Email Verification",
                    description: data.message,
                })
            })
        .catch((error : any ) => {
            console.log(error)
            toast({
                variant: "destructive",
                title: "Email Verification",
                description: 'OTP not corresponding to any user.',
                action: <ToastAction altText="Try again" onClick={TryAgain}>Try again</ToastAction>,
            })
        });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSeparator />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your phone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
