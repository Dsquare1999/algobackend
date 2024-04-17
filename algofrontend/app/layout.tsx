import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styles from "@/components/styles/backgroundVideo.module.css"
import { ThemeProvider } from "@/components/theme-provider"
import Provider from '@/redux/provider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AlgoWay",
  description: "Welcome to your future ...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <BackgroundVideo /> */}
      <body className={inter.className}>
        <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              // disableTransitionOnChange
            >
              {/* <AuthProvider> */}
                <Provider>
                  <ToastContainer />
                    <div>
                      {children}
                    </div>
                  <Toaster />
              </Provider>
            {/* </AuthProvider> */}

        </ThemeProvider>
      </body>
    </html>
  );
}
