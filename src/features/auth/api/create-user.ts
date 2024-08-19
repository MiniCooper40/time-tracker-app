import { api } from "@/src/lib/api";
import { User } from "@/src/types/user";
import { MutationOptions, useMutation } from "react-query";
import { AxiosError } from "axios";

type CreateUserInput = {
  email: string;
  token: string;
};

const createUser = (input: CreateUserInput): Promise<User> =>
  api.post("/user", input);

export const useCreateUser = (
  options?: MutationOptions<User, AxiosError, CreateUserInput>,
) => {
  return useMutation({
    mutationKey: "create-user",
    mutationFn: createUser,
    ...options,
  });
};
