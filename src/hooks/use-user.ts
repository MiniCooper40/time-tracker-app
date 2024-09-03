import { useIsMutating, useQuery } from "react-query";
import { User } from "../types/user";
import { api } from "@/src/lib/api";
import { AxiosError } from "axios";

export const getUser = (): Promise<User> => {
  return api.get("auth/me");
};

export const useUser = () => {
  const isCreatingUser = useIsMutating("create-user") > 0;
  console.log("isCreatingUser,", isCreatingUser);
  return useQuery<User, AxiosError>({
    queryKey: ["me"],
    queryFn: getUser,
    onError: (err) => {
      console.error("ERROR IN USEUSER");
      console.warn(err.toJSON());
      console.log(err.status);
    },
    onSuccess: console.log,
    retry: false,
    enabled: !isCreatingUser,
  });
};

export const useUserId = () => {
  const useUserResponse = useUser();
  const { data: user } = useUserResponse;
  if (user) return user.userId;
  else return undefined;
};
