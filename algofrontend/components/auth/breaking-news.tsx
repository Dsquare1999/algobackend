import Image from "next/image";
import { 
    Card,
    CardContent,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription
} from "../ui/card";
import DelayShow from "../delay-show";
import { Typewriter } from "react-simple-typewriter";
import TypingMessage from "./typing-message";
import { useCallback, useState } from "react";

interface BreakingNewsProps{
    src?: string
    title: string
    description : string
    since: string

    scrolling : boolean
    setScrolling : (value : boolean) => void
}

const BreakingNews = ({ src, title, description, since, scrolling, setScrolling} : BreakingNewsProps) => {

    const [detail, setDetail] = useState<boolean>(false)

    const onclick = useCallback(()=>{
        setDetail(!detail)
        setScrolling(!scrolling)
    }, [detail, scrolling, setScrolling])

    return ( 
        detail ? 
            (<Card className="w-full shadow cursor-pointer" onClick={onclick}>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-right text-xs">{since}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-between">
                    
                        {
                            !!src && (
                                <Image 
                                    width={100}
                                    height={100}
                                    src={src}
                                    alt="Breaking news image"
                                    className="w-full h-auto object-cover rounded"
                                />
                            )
                        }
                        
                        <p className="text-sm text-gray-500">
                            <DelayShow>
                                {description}
                            </DelayShow>
                        </p>
                </CardContent>
            </Card>)
            :
            (<Card className="w-full shadow cursor-pointer" onClick={onclick}>
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        {
                            !!src && (
                                <Image 
                                    width={100}
                                    height={100}
                                    src={src}
                                    alt="Breaking news image"
                                    className="object-cover rounded border"
                                />
                            )
                        }
                        
                        <div className="ml-2">
                            <h3 className="text-xs font-bold">
                                <DelayShow>
                                    {title}
                                </DelayShow>
                            </h3>
                            <p className="text-[10px] text-gray-500">
                                <DelayShow delay={1000}>
                                    <TypingMessage message={description} speed={30} />
                                </DelayShow>
                            </p>
                            <p className="text-[8px] text-gray-400 text-right">
                                <DelayShow delay={3000}>
                                    {since}
                                </DelayShow>
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>)
     );
}

export default BreakingNews;