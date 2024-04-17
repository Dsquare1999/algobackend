'use client'
import { Separator } from "../ui/separator";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { Button } from "../ui/button";
import Section from "./Section";

import { CashflowProp, BondProp } from "@/app/types/BondType";
import CashflowView from "../alm/bonds/CashflowView";
import BondsHeader from "../alm/bonds/BondsHeader";
import BondRow from "../alm/bonds/BondRow";
import ValorisationView from "../alm/bonds/ValorisationView";
import DurationView from "../alm/bonds/DurationView";
import EconomicValueView from "../alm/bonds/EcomicValueView";
import { useState } from "react";

interface BondPortofolioPageProps {
    bonds: BondProp[]
}

const BondAccordionContent = ({ bond }: { bond: BondProp }) => (
    <div className="flex flex-col space-y-4">
        <div className="w-full flex space-x-4">
            <div className="flex-1">
                <CashflowView cashflows={bond.cashflows} due_date={bond.due_date} value_date={bond.value_date} />
            </div>
            <div className="flex-1">
                <ValorisationView valorisations={bond.valorisations} due_date={bond.due_date} value_date={bond.value_date} />
            </div>
        </div>
        <DurationView durations={bond.duration_macaulay} due_date={bond.due_date} value_date={bond.value_date} />
        <EconomicValueView economicValues={bond.valorisations} due_date={bond.due_date} value_date={bond.value_date} />
    </div>
);

const BondPortofolioPage = ({ bonds }: BondPortofolioPageProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <Section title="Bonds" description="Find all your portofolio bonds here ...">
            <BondsHeader />
            <Separator className="my-2" />
            <Accordion type="single" collapsible defaultValue="Bond 1">
                {
                    bonds.map((bond, index) => (
                        <AccordionItem value={`Bond ${index + 1}`} >
                            <AccordionTrigger>
                                <BondRow bond={bond} />
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col space-y-4">
                                <BondAccordionContent bond={bond} />
                            </AccordionContent>
                        </AccordionItem>
                    ))
                }
            </Accordion>
            <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className="w-[350px] space-y-2"
            >
                <div className="flex items-center justify-between space-x-4 px-4">
                    <h4 className="text-sm font-semibold">
                        @peduarte starred 3 repositories
                    </h4>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm">
                            <CaretSortIcon className="h-4 w-4" />
                            <span className="sr-only">Toggle</span>
                        </Button>
                    </CollapsibleTrigger>
                </div>
                <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                    @radix-ui/primitives
                </div>
                <CollapsibleContent className="space-y-2">
                    <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                        @radix-ui/colors
                    </div>
                    <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                        @stitches/react
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </Section>
    );
}

export default BondPortofolioPage;