import { useContext } from "react";
import { AuthenticationContext } from "@/src/contexts/authentication-context";

export const useAuthentication = () => {
  return useContext(AuthenticationContext);
};
