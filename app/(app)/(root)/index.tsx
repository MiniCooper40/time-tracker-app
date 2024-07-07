import {Text} from "react-native";
import {Button, View, YStack} from "tamagui";
import {signOut} from "@/src/lib/auth";
import {useUser} from "@/src/hooks/useUser";
import {useGetUsersTimeTrackers} from "@/src/features/time-tracker/api/useGetUsersTimeTrackers";
import {useGetUsersGroupTrackers} from "@/src/features/group-tracker/api/useGetUsersGroupTrackers";
import {SafeAreaView} from "react-native-safe-area-context";
import {PageContainer} from "@/src/components/layouts/PageContainer";

const Page = () => {
    const user = useUser()
    if (!user.data) return null;

    return (
        <PageContainer>
            <YStack>
                <Text>Home!!</Text>
                <Text>Email: {user.data.email}</Text>
                <Button onPress={signOut}>Sign out</Button>
            </YStack>
        </PageContainer>
    )
}

export default Page