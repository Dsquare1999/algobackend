'use client'
import AuthNavBar from "@/components/auth/auth-navbar";
import UploadBond from "@/components/common/UploadBond";
import UploadBondPage from "@/components/common/UploadBondPage";
import styles from "@/components/styles/alm.module.css"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { useRetrieveBilanQuery } from "@/redux/features/retrieveApiSlice";
import BondPortofolioPage from "@/components/common/BondPortofolioPage";
import { CashflowData } from "@/data/CashflowsData";
import { BondProp } from "../types/BondType";

const ALMPage = () => {

    // Authentication redirection 
    const router = useRouter();
    const { isAuthenticated } = useAppSelector(state => state.auth);
    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/auth/login');
        }
    }, [isAuthenticated, router]);
    const [isHovered, setIsHovered] = useState<boolean>(false);


    // ALM States
    const [bonds, setBonds] = useState<BondProp[]>([])
    const { data: myBilan, isLoading: isBondLoading, isFetching: isBondFetching } = useRetrieveBilanQuery()

    useEffect(() => {
        if (myBilan && myBilan.length > 0 && myBilan[0].bondPortofolios && myBilan[0].bondPortofolios.length > 0 && myBilan[0].bondPortofolios[0].bonds) {
            const myBonds = myBilan[0].bondPortofolios[0].bonds;
            setBonds(myBonds)
            console.log("My bonds")
        } else {
            console.log("No Bond found !");
        }
    }, [myBilan])



    return (
        <div
            className="flex flex-col w-full h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={cn(styles.authNavbarContainer, `${isHovered ? 'hovered' : ''}`)}
            >
                <AuthNavBar />
            </div>
            <main className="h-[100vh] overflow-hidden grid grid-cols-3 gap-4 justify-items-center border pt-5">
                {/* <ScrollArea className="grid col-span-3">
                    <UploadBondPage/>
                    <ScrollBar orientation="vertical" />
                </ScrollArea> */}
                <div className="w-[80%] grid col-span-3">
                    <BondPortofolioPage bonds={bonds} />
                </div>
                <section className="grid col-span-1 ">

                </section>
            </main>

        </div>
    );
}

export default ALMPage;
