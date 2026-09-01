import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CompanionHouseGate } from "@/components/companion/CompanionHouseGate";
import { preloadCompanionSounds} from "@/lib/audio/companion-audio";
import Providers from "@/components/providers";
import { AudioBootstrap }
  from "@/components/audio/AudioBootstrap";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Time100",
  description: "Growth Operating System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en" 
      data-scroll-behavior="smooth" 
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <AudioBootstrap />
          {children}

          <CompanionHouseGate />
        </Providers>
      </body>
    </html>
  );
}