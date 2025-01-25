"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Wallet, Twitter, BarChart, Trophy } from "lucide-react";

const steps = [
  {
    icon: <Wallet className="h-8 w-8 text-white" />,
    title: "Connect Wallet",
    description: "Link your Web3 wallet to securely store your engagement points"
  },
  {
    icon: <Twitter className="h-8 w-8 text-white" />,
    title: "Link Twitter",
    description: "Connect your Twitter account to start tracking engagement"
  },
  {
    icon: <BarChart className="h-8 w-8 text-white" />,
    title: "Track Analytics",
    description: "Monitor your engagement metrics in real-time"
  },
  {
    icon: <Trophy className="h-8 w-8 text-white" />,
    title: "Earn Rewards",
    description: "Convert engagement into points and unlock rewards"
  }
];

export function HowItWorks() {
  return (
    <section className="py-24">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            How It Works
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Get started in just a few simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="glassmorphic p-6 relative">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[2px] bg-white/20" />
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}