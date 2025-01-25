"use client";

import { useState, useEffect } from "react";

export function useTwitterInteractions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInteractions = async () => {
    try {
      console.log("Fetching Twitter interactions..."); // Added logging
      setLoading(true);
      setError(null);
      const response = await fetch("/api/twitter/interactions");
      
      if (!response.ok) {
        throw new Error("Failed to fetch interactions");
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to process interactions");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch interactions");
      console.error("Error fetching interactions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch immediately on mount
    fetchInteractions();
  }, []);

  return { loading, error };
}