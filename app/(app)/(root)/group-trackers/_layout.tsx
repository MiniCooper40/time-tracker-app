import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(group-trackers)" />
      <Stack.Screen
        name="[trackerId]"
        options={{ presentation: "fullScreenModal" }}
      />
    </Stack>
  );
};

export default Layout;
