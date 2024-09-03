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

const signIn = (credentials: CredentialsInput): Promise<void> => {
  return new Promise((resolve, reject) => {
    supabase.auth
      .signInWithPassword({ ...credentials })
      .then((res) => {
        if (res.error || !res.data) reject();
        resolve();
      })
      .catch(reject);
  });
};

const signUp = async (credentials: CredentialsInput) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const response = await supabase.auth.signUp({ ...credentials });
      if (response.data.user) {
        resolve();
      } else reject("This user already exists");
    } catch (e) {
      reject("Error while creating this user");
    }
  });
};

const signOut = () => {
  AsyncStorage.clear();
  return supabase.auth.signOut();
};

export { signIn, signUp, signOut };
