"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./useAuth";

interface Interaction {
  id: string;
  engagement_type: string;
  points: number;
  created_at: string;
}

interface PointsByType {
  like: number;
  comment: number;
  retweet: number;
  quote: number;
}

export function useEngagementPoints() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [totalPoints, setTotalPoints] = useState(0);
  const [pointsByType, setPointsByType] = useState<PointsByType>({
    like: 0,
    comment: 0,
    retweet: 0,
    quote: 0,
  });
  const [interactions, setInteractions] = useState<Interaction[]>([]);

  useEffect(() => {
    if (!user || !supabase) return;

    const fetchPoints = async () => {
      try {
        const { data, error } = await supabase
          .from("engagement_points")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;

        setInteractions(data);

        // Calculate totals
        const points = data.reduce(
          (acc, curr) => {
            acc.total += curr.points;
            acc.byType[curr.engagement_type] =
              (acc.byType[curr.engagement_type] || 0) + curr.points;
            return acc;
          },
          { total: 0, byType: {} as Record<string, number> }
        );

        setTotalPoints(points.total);
        setPointsByType({
          like: points.byType.like || 0,
          comment: points.byType.comment || 0,
          retweet: points.byType.retweet || 0,
          quote: points.byType.quote || 0,
        });
      } catch (error) {
        console.error("Error fetching points:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();

    // Set up real-time subscription
    const subscription = supabase
      .channel("engagement_points_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "engagement_points",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          // Update state with new interaction
          setInteractions((prev) => [payload.new as Interaction, ...prev]);
          setTotalPoints((prev) => prev + (payload.new as Interaction).points);
          setPointsByType((prev) => ({
            ...prev,
            [(payload.new as Interaction).engagement_type]:
              prev[(payload.new as Interaction).engagement_type as keyof PointsByType] +
              (payload.new as Interaction).points,
          }));
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  return {
    totalPoints,
    pointsByType,
    interactions,
    loading,
  };
}