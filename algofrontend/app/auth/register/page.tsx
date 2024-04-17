"use client"
import AuthNavBar from "@/components/auth/auth-navbar";
import { RegisterForm } from "@/components/forms/register-form";
import TypingMessage from "@/components/auth/typing-message";
import DelayShow from "@/components/delay-show";
import { useCallback, useState } from "react";

import { InputOTPForm } from "@/components/forms/verify-form";


const RegisterPage = () => {

    const [isRegistered, setIsRegistered] = useState<boolean>(false)

    const updateRegistration = (isRegistered : boolean) => {
        setIsRegistered(isRegistered);
    };

    return ( 

        <div className="flex flex-col w-full h-full justify-between pb-5">
            <AuthNavBar />
            <div className="flex flex-col justify-between items-center">

                    {
                        isRegistered ? (

                            <div className="relative inset-0 backdrop-blur-sm bg-background/50 space-y-4 w-[80%] md:w-[40%] p-10 rounded-lg shadow">

                                <h2 className="text-2xl font-bold text-algoOrange">
                                    <DelayShow>
                                        <TypingMessage message="You have been successfully registered" />
                                    </DelayShow>
                                </h2>
                                <p>
                                    <DelayShow delay={1700}>
                                        <TypingMessage message="Please, check your mail to activate your account before accessing to AlgoWay" speed={20} />
                                    </DelayShow>
                                </p>

                                <DelayShow delay={2500}>
                                    <InputOTPForm />
                                </DelayShow>
                            </div>
                        ) : (
                            <div className="relative inset-0 backdrop-blur-sm bg-background/50 space-y-4 w-[80%] md:w-[40%] p-10 rounded-lg shadow">

                                <h2 className="text-2xl font-bold text-algoOrange">
                                    <DelayShow>
                                        <TypingMessage message="Welcome to your future ..." />
                                    </DelayShow>
                                </h2>
                                <p>
                                    <DelayShow delay={1500}>
                                        <TypingMessage message="Be part of AlgoFamily from now and let's begin the adventure" speed={20} />
                                    </DelayShow>
                                </p>

                                <DelayShow delay={4000}>
                                    <RegisterForm updateRegistration={updateRegistration} />
                                </DelayShow>
                            </div>
                        )
                    }
                
            </div>
            <p className="text-xs text-center w-[50%] self-center">
                By creating an account, you agree to the Terms of Service. For more information about AlgoWay privacy practices, see the AlgoWay Privacy Statement. 
            </p>
        </div>
     );
}
 
export default RegisterPage;