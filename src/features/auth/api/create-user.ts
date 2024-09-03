import { api } from "@/src/lib/api";
import { User } from "@/src/types/user";

type CreateUserInput = {
  email: string;
  token: string;
};

export const createUser = (input: CreateUserInput): Promise<User> =>
  api.post("/user", {
    ...input,
    firstName: "",
    lastName: "",
  });
