"use client";

import { motion } from "framer-motion";
import { Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSecretNetwork } from "@/providers/SecretNetworkProvider";

export function Hero() {
  const { connect, isConnected, disconnect, address } = useSecretNetwork();

  const handleWalletConnect = async () => {
    if (isConnected) {
      disconnect();
    } else {
      await connect();
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container px-4 mx-auto text-center z-10"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
          Track Your Twitter Impact
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Connect your wallet and Twitter account to measure your engagement and
          earn points based on your social impact.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className={`bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white ${
              isConnected ? "bg-green-500/30 hover:bg-green-500/40" : ""
            }`}
            onClick={handleWalletConnect}
          >
            {isConnected
              ? `Wallet Connected: ${address?.slice(0, 6)}...${address?.slice(
                  -4
                )}`
              : "Connect Wallet"}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white"
            asChild
          >
            <Link href="/auth/signin">
              <Twitter className="mr-2 h-5 w-5" />
              Connect Twitter
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
