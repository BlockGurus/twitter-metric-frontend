"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface LeaderboardUser {
  id: string;
  username: string;
  total_points: number;
}

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) return;

    const fetchLeaderboard = async () => {
      try {
        const { data, error } = await supabase
          .rpc('get_leaderboard')
          .limit(10);

        if (error) throw error;

        setLeaderboard(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();

    // Set up real-time subscription for leaderboard updates
    const subscription = supabase
      .channel("leaderboard_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "engagement_points",
        },
        () => {
          // Refresh leaderboard when points change
          fetchLeaderboard();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    leaderboard,
    loading,
  };
}