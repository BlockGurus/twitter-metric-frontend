"use client";

import { motion } from "framer-motion";
import { BarChart3, Shield, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: <BarChart3 className="h-10 w-10 text-white" />,
    title: "Track Engagement",
    description: "Monitor your Twitter engagement metrics in real-time with detailed analytics and insights."
  },
  {
    icon: <Zap className="h-10 w-10 text-white" />,
    title: "Earn Points",
    description: "Convert your social engagement into points based on likes, retweets, and meaningful interactions."
  },
  {
    icon: <Shield className="h-10 w-10 text-white" />,
    title: "Secure Storage",
    description: "Your data is safely stored and encrypted using blockchain technology and secure databases."
  }
];

export function Features() {
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
            Powerful Features
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Everything you need to track and analyze your Twitter engagement
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="glassmorphic p-6 h-full hover:bg-white/20 transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold mt-4 mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}