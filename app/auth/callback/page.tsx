"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    async function handleOAuthCallback() {
      // Manually parse the URL fragment (everything after the #)
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");

      if (!accessToken || !refreshToken) {
        console.error("Tokens not found in URL fragment");
        router.replace("/signin?error=oauth_error");
        return;
      }

      // Manually set the session using the extracted tokens
      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (error) {
        console.error("Error setting session manually:", error);
        router.replace("/signin?error=oauth_error");
        return;
      }

      router.replace("/dashboard");
    }
    handleOAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2832')] bg-cover bg-fixed">
      <div className="min-h-screen backdrop-blur-xl bg-black/50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent mx-auto"></div>
          <p className="text-white/90 text-lg">
            Processing authentication, please wait...
          </p>
        </div>
      </div>
    </div>
  );
}
