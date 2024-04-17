import { BondProp } from "@/app/types/BondType";

interface BondRowProps {
    bond: BondProp
}
 
const BondRow: React.FunctionComponent<BondRowProps> = ({bond} : BondRowProps) => {
    return ( 
        <ul className="flex w-full text-xs">
            <li className="flex-1 text-center">{bond.isin}</li>
            <li className="flex-1 text-center">{bond.outstanding}</li>
            <li className="flex-1 text-center">{bond.value_date}</li>
            <li className="flex-1 text-center">{bond.due_date}</li>
            <li className="flex-1 text-center">{bond.facial_rate}</li>
            <li className="flex-1 text-center">{bond.refund}</li>
            <li className="flex-1 text-center">{bond.differed}</li>
            <li className="flex-1 text-center">{bond.type}</li>
            <li className="flex-1 text-center">{bond.period}</li>
        </ul>
     );
}
 
export default BondRow;