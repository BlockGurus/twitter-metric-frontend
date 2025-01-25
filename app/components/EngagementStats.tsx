"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function EngagementStats() {
  return (
    <section className="py-24">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="glassmorphic p-8">
            <h3 className="text-2xl font-bold mb-6 text-white">Your Engagement Stats</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-white">Total Points</span>
                  <span className="text-sm text-gray-300">0 / 1000</span>
                </div>
                <Progress value={0} className="bg-white/10" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-white">Tweets Analyzed</span>
                  <span className="text-sm text-gray-300">0</span>
                </div>
                <Progress value={0} className="bg-white/10" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-white">Engagement Rate</span>
                  <span className="text-sm text-gray-300">0%</span>
                </div>
                <Progress value={0} className="bg-white/10" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}