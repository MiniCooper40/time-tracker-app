import { useAuthentication } from "@/src/hooks/use-authentication";
import { Text } from "react-native";
import {Redirect, Stack, useRouter} from "expo-router";
import {useUser} from "@/src/hooks/use-user";
import {signOut} from "@/src/lib/auth";
import {queryClient} from "@/src/lib/react-query";
import {useIsMutating} from "react-query";

const Layout = () => {
  console.log("in authenticated layout")
  const { session, loading } = useAuthentication();
  // const user = useUser()
  // const router = useRouter()



  if (loading) return <Text>Loading...</Text>;
  else if (!session) return <Redirect href="/" />;
  else
    return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(root)" />
      </Stack>
    );
};

export default Layout;
