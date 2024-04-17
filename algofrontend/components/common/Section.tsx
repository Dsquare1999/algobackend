import { Button } from "../ui/button";
import { IoClose } from "react-icons/io5";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";

interface SectionProps {
    title ?: string
    description ?: string
    children : React.ReactNode
}
const Section = ({title = "Title", description, children} : SectionProps) => {
    const closeSection = () => {

    }

    return ( 
        <Card>
            <CardHeader>
                <CardTitle className="text-algoMarron dark:text-algoOrange">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 h-[80vh]">
                <ScrollArea>
                    {children}
                </ScrollArea>
            </CardContent>
        </Card>
     );
}
 
export default Section;