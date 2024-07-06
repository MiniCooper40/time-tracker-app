import {Text} from "react-native";
import {useUser} from "@/src/hooks/useUser";
import { AntDesign } from '@expo/vector-icons';
import {Tabs} from "expo-router";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Layout = () => {
    const useUserQuery = useUser()

    if(useUserQuery.isFetching) return <Text>Loading...</Text>
    else return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 64
                },
                headerShown: false,
                tabBarActiveTintColor: "purple"
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Dashboard",
                    tabBarIcon: ({color, size}) => <AntDesign name="home" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="insights"
                options={{
                    title: "Insights",
                    tabBarIcon: ({color, size}) => <AntDesign name="barschart" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="group-trackers"
                options={{
                    title: "Groups",
                    tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="format-list-group" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="time-trackers"
                options={{
                    title: "Trackers",
                    tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="timer-outline" size={size} color={color} />
                }}
            />
        </Tabs>
    )
}

export default Layout