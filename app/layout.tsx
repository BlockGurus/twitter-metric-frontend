import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SecretNetworkProvider } from "@/providers/SecretNetworkProvider";
import { NextAuthProvider } from "@/providers/NextAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TweetAnalytics - Track Your Twitter Impact",
  description:
    "Connect your wallet and Twitter account to measure your engagement and earn points based on your social impact.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <NextAuthProvider>
          <SecretNetworkProvider>{children}</SecretNetworkProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
