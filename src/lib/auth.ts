import { supabase } from "@/src/lib/supabase";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface CredentialsInput {
  email: string;
  password: string;
}

export const credentialsInputSchema = yup.object({
  email: yup.string().email().required("You must enter an email"),
  password: yup.string().min(1).required("You must login with a password"),
});

const signIn = (credentials: CredentialsInput) => {
  return supabase.auth.signInWithPassword({ ...credentials });
};

const signUp = (credentials: CredentialsInput) => {
  return supabase.auth.signUp({ ...credentials });
};

const signOut = () => {
  AsyncStorage.clear();
  return supabase.auth.signOut();
};

export { signIn, signUp, signOut };
