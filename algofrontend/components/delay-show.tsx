"use client"

import { useEffect, useState } from "react";

interface DelayShowProps {
    children : React.ReactNode,
    delay ?: number
}

const DelayShow = ({ children, delay } : DelayShowProps) => {

    const [showDelayedMessage, setShowDelayedMessage] = useState<boolean>(false);

    useEffect(() => {
        if(!delay) {
            setShowDelayedMessage(true)
        }else{
            setShowDelayedMessage(false)
            const timer = setTimeout(() => {
            setShowDelayedMessage(true);
            }, delay); 
        
            return () => clearTimeout(timer);
        }
    }, [delay]);

    return ( 
        <>
            {showDelayedMessage && (
                children
            )}
        </>
     );
}
 
export default DelayShow;