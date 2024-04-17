"use client"
import AuthNavBar from "@/components/auth/auth-navbar";
import BreakingNews from "@/components/auth/breaking-news";
import BreakingNewsSideBar from "@/components/auth/breaking-news-sidebar";
import LoginForm from "@/components/forms/login-form";

import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage : React.FC = () => {
    const router = useRouter();
    const { isAuthenticated } = useAppSelector(state => state.auth);
  
    useEffect(() => {
      if (isAuthenticated) {
        router.push('/alm');
      }
    }, [isAuthenticated, router]);

    return ( 
        <div className="flex flex-col w-full h-full">
            <AuthNavBar />
            <div className="flex px-10 py-5 space-x-10">
                <aside className="backdrop-blur-sm bg-background/50 h-full- w-full p-2 space-y-4 rounded-lg shadow relative">
                    
                    <div className="absolute right-0 left-0 top-0 w-full h-[180px] bg-gradient-to-t  from-transparent to-background z-10 rounded-lg"></div>
                    <div className="absolute right-0 left-0 bottom-0 w-full h-[180px] bg-gradient-to-b from-transparent to-background z-10 rounded-lg"></div>

                    <BreakingNewsSideBar side={1} />

                </aside>
                <section className="w-full flex items-center justify-center">
                    <LoginForm />
                </section>
                <aside className="backdrop-blur-sm bg-background/50 w-full h-full p-2 space-y-4 rounded-lg shadow relative">
                    <div className="absolute right-0 left-0 top-0 w-full h-[180px] bg-gradient-to-t  from-transparent to-background z-10 rounded-lg"></div>
                    <div className="absolute right-0 left-0 bottom-0 w-full h-[180px] bg-gradient-to-b from-transparent to-background z-10 rounded-lg"></div>
                    
                    <BreakingNewsSideBar side={2} />
                </aside>
            </div>
            
        </div>
     );
}
 
export default LoginPage;