import type { Metadata } from "next";
import "../globals.css";
import styles from "@/components/styles/backgroundVideo.module.css"



export const metadata: Metadata = {
  title: "AlgoWay Authentication",
  description: "AlgoWay Authentication Interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.background}>
        <video autoPlay loop muted playsInline className={styles.backgroundVideo}>
            <source src="/assets/video/background.mp4" type="video/mp4" />
            {/* Ajoutez d'autres sources pour la compatibilité avec différents navigateurs */}
            Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-background/80 root-layout">
            {children}
        </div>
    </div>
  );
}
