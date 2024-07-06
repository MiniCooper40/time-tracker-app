import {useAuthentication} from "@/src/hooks/useAuthentication";
import {Text} from "react-native";
import {Redirect, Slot, Stack} from "expo-router";

const Layout = () => {
    const {session, loading} = useAuthentication()

    if(loading) return <Text>Loading...</Text>
    else if(!session) return <Redirect href="/sign-in" />;
    else return <Slot />
}

export default Layout