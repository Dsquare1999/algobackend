const BondsHeader = () => {
    return ( 
        <ul className="flex w-full text-xs">
            <li className="flex-1 text-center">Isin</li>
            <li className="flex-1 text-center">Outstanding</li>
            <li className="flex-1 text-center">Value Date</li>
            <li className="flex-1 text-center">Due Date</li>
            <li className="flex-1 text-center">Facial Rate</li>
            <li className="flex-1 text-center">Refund</li>
            <li className="flex-1 text-center">Differed</li>
            <li className="flex-1 text-center">Type</li>
            <li className="flex-1 text-center">Period</li>
        </ul>
     );
}
 
export default BondsHeader;