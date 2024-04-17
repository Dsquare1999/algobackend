"use client"
import { useState } from "react"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { Button } from "@/components/ui/button";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/components/ui/use-toast"
import UploadBond from "@/components/common/UploadBond";
import { ScrollArea } from "@/components/ui/scroll-area";
import UploadBondPage from "@/components/common/UploadBondPage";

export default function Admin() {

    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const FormSchema = z.object({
        pin: z.string().min(7, {
            message: "Your one-time password must be 13 characters.",
        }),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    })
    
    function onSubmit(data: z.infer<typeof FormSchema>) {
        // alert(process.env.ADMIN_DASHBOARD_PASSWORD)
        if(data.pin == 'ALGOWAY123456'){
            setIsAdmin(true)
            toast({
                title: "Welcome Admin"
            })
        }else{
            toast({
                variant: "destructive",
                title: "It seems that you're not an Admin"
            })
        }
        
    }
 
    return (
        <main>
            {!isAdmin && (
                <section className="absolute z-10 top-0 bottom-0 right-0 left-0 backdrop-blur-sm bg-background/40 flex justify-center items-center">
                   <div className="w-[50%] mx-auto px-10 py-20 rounded-lg shadow-md bg-background  space-y-4">
                       <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                            <FormField
                            control={form.control}
                            name="pin"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Enter Admin Password</FormLabel>
                                <FormControl>
                                    <InputOTP maxLength={13} {...field} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                            <InputOTPSlot index={6} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot index={7} />
                                            <InputOTPSlot index={8} />
                                            <InputOTPSlot index={9} />
                                            <InputOTPSlot index={10} />
                                            <InputOTPSlot index={11} />
                                            <InputOTPSlot index={12} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormDescription>
                                    Please enter the admin password to access the dashboard.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                
                        <Button type="submit">Submit</Button>
                    </form>
                    </Form>
                   </div>
                </section>
            )} 
            <section className="w-full flex flex-col space-y-6">
                <UploadBondPage isAdminPage={true} />
            </section>
        
        </main>
    );
}
