import { Session } from "@supabase/auth-js";
import {ReactNode, useEffect, useState} from "react";
import { AuthenticationContext } from "@/src/contexts/authentication-context";
import { supabase } from "@/src/lib/supabase";
import { router } from "expo-router";

export const AuthenticationProvider = ({ children }: {children: ReactNode}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthenticationContext.Provider value={{ session, loading }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
