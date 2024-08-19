import {Stack} from "expo-router";


const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false, presentation: "modal" }}>
      <Stack.Screen name="(home)" />
      <Stack.Screen name="settings" />
    </Stack>
  );
};

export default Layout;
