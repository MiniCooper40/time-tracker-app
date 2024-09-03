import { supabase } from "@/src/lib/supabase";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/user";
import { getUser } from "@/src/hooks/use-user";
import { queryClient } from "@/src/lib/react-query";
import { createUser } from "@/src/features/auth/api/create-user";

export interface CredentialsInput {
  email: string;
  password: string;
}

export const credentialsInputSchema = yup.object({
  email: yup.string().email().required("You must enter an email"),
  password: yup.string().min(1).required("You must login with a password"),
});

const signIn = async (credentials: CredentialsInput): Promise<User> => {
  return new Promise(async (resolve, reject) => {
    try {
      const signIn = await supabase.auth.signInWithPassword({ ...credentials });
      if (signIn.data.user !== null && signIn.data.session) {
        try {
          const user = await getUser();
          console.log(`got existing user: ${user}`);
          queryClient.setQueryData(["me"], user);
          resolve(user);
        } catch (e) {
          console.log(
            "User does not exist, creating user: " + signIn.data.user.email,
          );
          try {
            const user = await queryClient.executeMutation({
              mutationKey: "create-user",
              mutationFn: async () =>
                await createUser({
                  email: credentials.email,
                  // @ts-ignore
                  token: signIn.data.user.id,
                }),
            });
            console.log(`created user: ${JSON.stringify(user)}`);
            queryClient.setQueryData(["me"], user);
            resolve(user);
            console.log(`created user: ${JSON.stringify(user)}`);
          } catch (e: any) {
            console.error(e);
            reject(e);
          }
        }
      } else reject();
    } catch (e) {
      console.error(JSON.stringify(e));
      reject(e);
    }
  });
};

const signUp = async (credentials: CredentialsInput) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const response = await supabase.auth.signUp({ ...credentials });
      console.log(`sign up response: ${JSON.stringify(response)}`);
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
