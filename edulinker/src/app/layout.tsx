import type { Metadata } from "next";
import { Montserrat, Geist, Geist_Mono, Roboto, Poppins } from "next/font/google";
import "../styles/globals.css";
import CookieConsent from "@/components/CookieConsent";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const roboto = Roboto({ variable: '--font-roboto', subsets: ['latin'] });

const poppins = Poppins({ variable: '--font-poppins', subsets: ['latin'], weight: ['400', '700'], });

export const metadata: Metadata = {
  title: "EduLinker",
  description: "Gerador de sites",
  icons: {
    icon: "/icon/favicon.ico",        
    shortcut: "/icon/favicon.ico",    
    apple: "/logo/edulinker.png"    
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`
        ${montserrat.variable}
        ${geistSans.variable}
        ${geistMono.variable}
        ${roboto.variable}
        ${poppins.variable} 
        antialiased
      `}>
        <CookieConsent />
        {children}
      </body>
    </html>
  );
}