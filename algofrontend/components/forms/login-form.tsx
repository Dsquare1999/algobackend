"use client"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { CardWrapper } from "../auth/card-wrapper";
import { useState, useTransition } from "react";
import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import {
  Form,
  FormControl,
  FormField,
  FormItem, 
  FormLabel,
  FormMessage,  
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import { useAppDispatch } from '@/redux/hooks';
import { useLoginMutation } from '@/redux/features/authApiSlice';
import { setAuth } from '@/redux/features/authSlice';
import { useRouter } from 'next/navigation';


const LoginForm = () => {

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with different provider!"
        : "";

    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const router = useRouter();
    const dispatch = useAppDispatch();
	  const [login, { isLoading }] = useLoginMutation();


    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
          email: "",
          password: "",
        },
      });

      const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        
        setError("");
        setSuccess("");

        login(values)
			    .unwrap()
          .then((res : any ) => {
              
              const response = res

              const user={
                'full_name':response.full_name,
                'email':response.email
              }

              dispatch(setAuth());
              localStorage.setItem('token', JSON.stringify(response.access_token))
              localStorage.setItem('refresh_token', JSON.stringify(response.refresh_token))
              localStorage.setItem('user', JSON.stringify(user))
              toast.success('Login successful')
              router.push('/alm');
          })
          .catch((error : any) => {
            console.log(error)  
            toast.error("Something went wrong during the login process")
          });
      };

    return (
        <CardWrapper
          headerLabel="Welcome back"
          backButtonLabel="Don't have an account?"
          backButtonHref="/auth/register"
          showSocial
        >
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div className="space-y-4">
                {showTwoFactor && (
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Two Factor Code</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isLoading}
                            placeholder="123456"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {!showTwoFactor && (
                  <>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isLoading}
                              placeholder="john.doe@example.com"
                              type="email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isLoading}
                              placeholder="******"
                              type="password"
                            />  
                          </FormControl>
                          <Button
                            size="sm"
                            variant="link"
                            asChild
                            className="px-0 font-normal"
                          >
                            <Link href="/auth/reset">
                              Forgot password?
                            </Link>
                          </Button>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </>
              )}
              </div>
              <FormError message={error || urlError} />
              <FormSuccess message={success} />
              <Button
                disabled={isLoading}
                type="submit"
                className="w-full"
              >
                {showTwoFactor ? "Confirm" : "Login"}
              </Button>
            </form>
          </Form>
        </CardWrapper>
      );
}
 
export default LoginForm;