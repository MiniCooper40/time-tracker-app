import { User } from "@/src/types/user";
import {createContext} from "react";

interface UserContextType {
  data: User | undefined;
  isCreating: boolean;
  isFetching: boolean;
}

export const UserContext = createContext<UserContextType>({
  data: undefined,
  isCreating: false,
  isFetching: false
})