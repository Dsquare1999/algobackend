"use client"

import { useRouter } from "next/navigation";

interface LoginRegisterButtonProps {
  children: React.ReactNode;
  type : string;
  mode?: "modal" | "redirect",
  asChild?: boolean;
};

export const LoginRegisterButton = ({
    children,
    type
  }: LoginRegisterButtonProps) => {
    
    const router = useRouter();

    const onClick = () => {
        router.push(`/auth/${type}`);
    };
  
    return (
      <span onClick={onClick} className="cursor-pointer underline px-3">
        {children}
      </span>
    );
  };