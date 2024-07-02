import {useAuthentication} from "@/src/hooks/useAuthentication";
import {Text} from "react-native";
import {Redirect, Slot, Stack} from "expo-router";

const Layout = () => {
    const {session, loading} = useAuthentication()
    console.log("in nested layout, session is " + session?.access_token)
    console.log("in nested layout, loading is " + loading)
    if(loading) return <Text>Loading...</Text>
    else if(!session) return <Redirect href="/sign-in" />;
    else return <Slot />
}

export default Layout