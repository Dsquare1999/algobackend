"use client";

// import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { continueWithGoogle, continueWithFacebook } from '@/utils';

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "github") => {
    // signIn(provider, {
    //   callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    // });
  }

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={continueWithGoogle}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      
    </div>
  );
};