import { Session } from "@supabase/auth-js";
import { createContext } from "react";

interface AuthenticationContextType {
  session: Session | null;
  loading: boolean;
}

export const AuthenticationContext = createContext<AuthenticationContextType>({
  session: null,
  loading: true,
});
