"use client";

import { Card } from "@/components/ui/card";
import { Heart, MessageCircle, Repeat, Quote } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts";
import { useEngagementPoints } from "@/hooks/useEngagementPoints";

const ENGAGEMENT_COLORS = {
  like: "hsl(var(--chart-1))",
  comment: "hsl(var(--chart-2))",
  retweet: "hsl(var(--chart-3))",
  quote: "hsl(var(--chart-4))",
};

export function PointsBreakdown() {
  const { pointsByType, loading } = useEngagementPoints();

  const data = [
    { name: "Likes", value: pointsByType.like || 0, icon: Heart },
    { name: "Comments", value: pointsByType.comment || 0, icon: MessageCircle },
    { name: "Retweets", value: pointsByType.retweet || 0, icon: Repeat },
    { name: "Quotes", value: pointsByType.quote || 0, icon: Quote },
  ];

  return (
    <Card className="glassmorphic p-6">
      <h2 className="text-xl font-bold text-white mb-6">Points Breakdown</h2>
      
      <div className="h-[300px]">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-300">Loading...</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={Object.values(ENGAGEMENT_COLORS)[index]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "rgba(0, 0, 0, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                }}
                itemStyle={{ color: "#fff" }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-2 text-gray-300"
          >
            <item.icon className="h-4 w-4" />
            <span>{item.name}: {item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}