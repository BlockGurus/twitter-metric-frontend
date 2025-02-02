"use client";

import { useState, useEffect } from "react";

export function useTwitterInteractions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchInteractions = async () => {
    try {
      await fetch("/api/twitter/interactions");
    } catch (err) {
      console.log("error", err);
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
