import {Text} from "react-native";
import {Button, View, YStack} from "tamagui";
import {signOut} from "@/src/lib/auth";

const Home = () => {
    console.log("in home")
    return (
        <YStack>
            <Text>Home!!</Text>
            <Button onPress={signOut}>Sign out</Button>
        </YStack>
    )
}

export default Home