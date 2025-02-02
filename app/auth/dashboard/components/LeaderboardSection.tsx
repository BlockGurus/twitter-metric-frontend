"use client";

import { Card } from "@/components/ui/card";
import { Medal } from "lucide-react";
import { motion } from "framer-motion";
import { useLeaderboard } from "@/hooks/useLeaderboard";

export function LeaderboardSection() {
  const { leaderboard, loading } = useLeaderboard();

  return (
    <Card className="glassmorphic p-6">
      <h2 className="text-xl font-bold text-white mb-6">Top Engagers</h2>

      {loading ? (
        <p className="text-gray-300 text-center">Loading...</p>
      ) : (
        <div className="space-y-4">
          {leaderboard.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-lg bg-white/5"
            >
              <div className="flex-shrink-0">
                {index < 3 ? (
                  <Medal
                    className={`h-6 w-6 ${
                      index === 0
                        ? "text-yellow-500"
                        : index === 1
                        ? "text-gray-400"
                        : "text-orange-700"
                    }`}
                  />
                ) : (
                  <span className="text-gray-400 w-6 text-center">
                    {index + 1}
                  </span>
                )}
              </div>
              <div className="flex-grow">
                <p className="text-white font-medium">@{user.username}</p>
                <p className="text-sm text-gray-400">
                  {user.total_points} points
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </Card>
  );
}