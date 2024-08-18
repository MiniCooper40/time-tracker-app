import { Text } from "react-native";
import { useUser } from "@/src/hooks/use-user";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useTheme } from "tamagui";

const Layout = () => {
  const useUserQuery = useUser();

  const theme = useTheme();

  if (useUserQuery.isFetching) return <Text>Loading...</Text>;
  else
    return (
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 64,
            backgroundColor: theme.background?.get(),
            elevation: 0,
          },
          tabBarActiveTintColor: "black",
          headerStyle: {
            height: 70,
          },
          headerShown: false,
        }}
        sceneContainerStyle={{
          backgroundColor: theme.background?.get(),
        }}
      >
        <Tabs.Screen
          name="(dashboard)"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="group-trackers"
          options={{
            title: "Groups",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="format-list-group"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="time-trackers"
          options={{
            title: "Trackers",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="timer-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    );
};

export default Layout;
