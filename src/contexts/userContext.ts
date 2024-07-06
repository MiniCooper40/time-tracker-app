import {createContext} from "react";
import {User} from "@supabase/auth-js";

export const UserContext = createContext<User | undefined>(undefined)