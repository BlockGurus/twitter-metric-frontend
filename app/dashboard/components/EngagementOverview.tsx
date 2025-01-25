"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { useEngagementPoints } from "@/hooks/useEngagementPoints";

export function EngagementOverview() {
  const { totalPoints, loading } = useEngagementPoints();
  const [progress, setProgress] = useState(0);
  const nextMilestone = Math.ceil(totalPoints / 1000) * 1000;

  useEffect(() => {
    const progressValue = (totalPoints % 1000) / 10;
    setProgress(progressValue);
  }, [totalPoints]);

  return (
    <Card className="glassmorphic p-6">
      <div className="flex items-center gap-4 mb-6">
        <Trophy className="h-8 w-8 text-yellow-500" />
        <div>
          <h2 className="text-xl font-bold text-white">Total Points</h2>
          <p className="text-gray-300">Progress to next milestone</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-white mb-4"
      >
        {loading ? "..." : totalPoints}
      </motion.div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-300">Progress to {nextMilestone}</span>
          <span className="text-white">{progress}%</span>
        </div>
        <Progress value={progress} className="bg-white/10" />
      </div>
    </Card>
  );
}