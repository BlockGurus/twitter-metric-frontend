// useAuth.tsx
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function useAuth(initialUser: User | null = null) {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null>(initialUser);
  const [loading, setLoading] = useState(!initialUser);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    let _user = localStorage.getItem("sb-lysagtmixldesfmutaby-auth-token");
    if (_user) {
      setUser(JSON.parse(_user));
    }
  }, [user]);
  return {
    user,
    loading,
    signOut: async () => {
      await supabase.auth.signOut();
    },
  };
}
