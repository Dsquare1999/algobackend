"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { BackButton } from "../auth/back-button";
import axios from "axios"
import { toast } from "react-toastify";

import { FaUserShield } from "react-icons/fa6";
import DelayShow from "../delay-show";
import TypingMessage from "../auth/typing-message";
import { Social } from "../auth/social";


import { useRouter } from 'next/navigation';
import { useRegisterMutation } from '@/redux/features/authApiSlice';

interface RegisterFormProps {
  updateRegistration : (newState: boolean) => void;
}
export const RegisterForm = ({updateRegistration} : RegisterFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const router = useRouter();
	const [register, { isLoading }] = useRegisterMutation();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      password2: "",
      first_name: "",
      last_name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {

    setError("");
    setSuccess("");

		// register(values)
    await axios.post('http://localhost:8000/api/v1/auth/register/',values)
			.then((data) => {
        console.log(data)
				toast.success('Successful registration');
        updateRegistration(true);
			})
			.catch((error : any) => {
        console.log(error)
        if (error.data) {
          if (error.data.password) {
            const passwordErrors = error.data.password;
            const errorMessage = passwordErrors.join(". ");
            setError(errorMessage);
          }

          if (error.data.email) {
            const passwordErrors = error.data.email;
            const errorMessage = passwordErrors.join(". ");
            setError(errorMessage);
          } 
        } else {
          toast.error("Registration failed. Please try again later.");
        }
			});
	};

  return (
  
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="space-y-4">
              <div className="flex space-x-3">
                <FormField
                  
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isLoading}
                          placeholder="John"
                          autoFocus
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isLoading}
                          placeholder="Doe"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
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
              <div className="flex w-full flex-grow items-center space-x-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isLoading}
                          placeholder="******"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password2"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Confirm password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isLoading}
                          placeholder="******"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <div className="flex justify-end">
              <Button
                disabled={isLoading}
                type="submit"
                className="w-auto h-full"
              >
                Create an account 
              </Button>
            </div>
            

            
          </form>
          <div className="w-full flex justify-between space-x-6">
            <div className="w-full flex flex-col space-y-2">
              <p className="text-xs text-center">Or register with </p>
              <Social />
            </div>
            <div className="w-full flex justify-end items-end">
              <BackButton
                label={"Already have an account? Sign in"}
                href={"/auth/login"}
              />
            </div>
            
            
          </div>
        </Form>
      )
};