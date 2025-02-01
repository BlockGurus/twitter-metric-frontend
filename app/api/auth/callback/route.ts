// app/api/auth/callback/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// Ensure you have your environment variables set:
// NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

export async function GET(request: Request) {
  // Create a server-side Supabase client that uses cookies.
  const cookieStore = cookies();
  const supabase = createServerComponentClient(
    {
      cookies: () => cookieStore,
    },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    }
  );

  // Parse the incoming URL for the OAuth code.
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    // Exchange the code for a session.
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("Error exchanging code for session:", error);
      return NextResponse.redirect(`${origin}/signin?error=oauth_error`);
    }
    // If successful, the session is now written to a cookie.
    return NextResponse.redirect(`${origin}/dashboard`);
  }

  // If no code is present, redirect back with an error.
  return NextResponse.redirect(`${origin}/signin?error=no_code`);
}
