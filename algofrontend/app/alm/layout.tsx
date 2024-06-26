import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Asset Liability Management - AlgoWay",
  description: "Dashboard ALM for Asset Liability Management",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div>   
        {children}
    </div>
  );
}
