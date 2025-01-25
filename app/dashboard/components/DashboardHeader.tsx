"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut } from "lucide-react";

export function DashboardHeader() {
  const { user, signOut } = useAuth();

  return (
    <Card className="glassmorphic p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Engagement Dashboard</h1>
          <p className="text-gray-300">
            Tracking interactions with @coinfi
          </p>
        </div>
        <Button
          variant="outline"
          className="bg-white/10 hover:bg-white/20 text-white"
          onClick={signOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </Card>
  );
}