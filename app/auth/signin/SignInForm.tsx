"use client";

import { Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    if (!supabase) {
      setError("Please connect your Supabase project first by clicking the 'Connect to Supabase' button in the top right corner.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          scopes: 'tweet.read users.read',
        },
      });

      if (signInError) {
        if (signInError.message.includes('configuration')) {
          throw new Error('Twitter authentication is not configured. Please make sure Twitter OAuth is set up in your Supabase dashboard.');
        }
        throw signInError;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to sign in with Twitter. Please try again.";
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-md mx-auto"
    >
      <Card className="glassmorphic p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Sign in to TweetAnalytics</h1>
          <p className="text-gray-300">
            Connect your Twitter account to start tracking your engagement
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <Button
          onClick={handleSignIn}
          disabled={isLoading || !supabase}
          className="w-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white"
        >
          <Twitter className="mr-2 h-5 w-5" />
          {isLoading ? "Connecting..." : "Continue with Twitter"}
        </Button>

        <p className="mt-4 text-sm text-gray-400 text-center">
          By signing in, you agree to our{" "}
          <a href="/terms" className="text-white hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-white hover:underline">
            Privacy Policy
          </a>
        </p>
      </Card>
    </motion.div>
  );
}