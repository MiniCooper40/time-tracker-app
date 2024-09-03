import { User } from "../types/user";
import { api } from "@/src/lib/api";
import { useContext } from "react";
import { UserContext } from "@/src/contexts/user-context";

export const getUser = (): Promise<User> => {
  return api.get("auth/me");
};

export const useUser = () => useContext(UserContext);

export const useUserId = () => {
  const { data: user } = useUser();
  if (user) return user.userId;
  else return undefined;
};
