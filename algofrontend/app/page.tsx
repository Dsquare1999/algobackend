import { LoginRegisterButton } from "@/components/auth/login-register-button";
import ThemeDropDown from "@/components/theme-dropdown";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import * as React from "react"


export default function Home() {
  return (
    <main className="flex flex-col h-full items-center justify-center p-24 relative">

        <span className="absolute top-10 left-[90%]">
          <ThemeDropDown />
        </span>
        <span className="absolute top-10 left-[10%]">
          <Image
              src="/assets/image/logo.png"
              width={80}
              height={80}
              alt="AlgoWay Logo"
              style={{objectFit: "contain"}}
            />
        </span> 
      
        <div className="space-y-6 text-center">
          <h1 className={cn(
            "text-6xl font-semibold drop-shadow-md"
          )}>
            🔐 AlgoWay
          </h1>
          <p className=" text-lg">
            Authenticate to start the journey with us ...
          </p>
          <div>
            <LoginRegisterButton type="register"  asChild>
              <Button variant="secondary" size="lg">
                Authenticate
              </Button>
            </LoginRegisterButton>
          </div>
        </div>
        
      
    </main>
  );
}