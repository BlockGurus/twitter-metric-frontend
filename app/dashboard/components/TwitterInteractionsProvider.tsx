"use client";

import { useTwitterInteractions } from "@/hooks/useTwitterInteractions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function TwitterInteractionsProvider({ children }: { children: React.ReactNode }) {
  const { error } = useTwitterInteractions();

  return (
    <>
      {error && (
        <div className="container mx-auto px-4 mb-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to fetch Twitter interactions: {error}
            </AlertDescription>
          </Alert>
        </div>
      )}
      {children}
    </>
  );
}