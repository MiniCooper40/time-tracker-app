import {Text} from "react-native";
import {Button, View, YStack} from "tamagui";
import {signOut} from "@/src/lib/auth";
import {useUser} from "@/src/hooks/useUser";

const Home = () => {
    console.log("in home")
    const userQuery = useUser()
    const {data: user} = userQuery

    console.log({user})

    return (
        <YStack>
            <Text>Home!!</Text>
            {userQuery.isFetching && <Text>Loading...</Text>}
            {userQuery.isFetched && <Text>Email: {user?.email}</Text>}
            <Button onPress={signOut}>Sign out</Button>
        </YStack>
    )
}

export default Home