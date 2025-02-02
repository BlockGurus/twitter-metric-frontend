"use client";

import { useState, useEffect } from "react";

export function useTwitterInteractions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchInteractions = async () => {
    try {
      const response = await fetch("/api/twitter/interactions");
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to process interactions");
      }
    } catch (err) {
      console.error(err);
      // Handle JSON parse errors specifically
      if (err instanceof SyntaxError) {
        setError("Invalid response from server");
      } else {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    }
  };
  useEffect(() => {
    // Fetch immediately on mount
    fetchInteractions();
  }, []);

  return { loading, error };
}
