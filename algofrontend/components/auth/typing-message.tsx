"use client"

import { Typewriter, useTypewriter } from "react-simple-typewriter";

interface TypingMessageProps {
    message : string,
    speed?:number,
    cursor? : boolean
}
const TypingMessage = ({ message, speed=40, cursor= true } : TypingMessageProps) => {

    return ( 
        cursor ? (
            <Typewriter 
            words={[message]}
            cursor
            cursorStyle='_'    
            typeSpeed={speed}
            />
        ) : (
            <Typewriter 
            words={[message]}
            typeSpeed={speed}
            />
        )
     )
}
 
export default TypingMessage;