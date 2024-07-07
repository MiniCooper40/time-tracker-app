import {Text} from "react-native";
import {Button, YStack} from "tamagui";
import {signOut} from "@/src/lib/auth";
import {useUser} from "@/src/hooks/useUser";
import {PageContainer} from "@/src/components/layouts/PageContainer";
import {Link} from "expo-router";

const Page = () => {
    const user = useUser()
    if (!user.data) return null;

    return (
            <YStack>
                <Text>Home!!</Text>
                <Text>Email: {user.data.email}</Text>
                <Button onPress={signOut}>Sign out</Button>
                <Link href="/_sitemap">Go to sitemap</Link>
            </YStack>
    )
}

export default Page