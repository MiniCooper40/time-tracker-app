import { Text } from "tamagui";
import { Redirect, Stack } from "expo-router";
import { useUser } from "@/src/hooks/use-user";
import {LoadingPage} from "@/src/components/loading/LoadingPage";

const Layout = () => {
  const user = useUser();

  if (user.isFetching || user.isCreating) return <LoadingPage />;
  else if (!user.data) return <Redirect href="/" />;
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
