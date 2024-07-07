import {useUser} from "@/src/hooks/useUser";
import {useGetUsersTimeTrackers} from "@/src/features/time-tracker/api/useGetUsersTimeTrackers";
import {TimeTrackerList} from "@/src/features/time-tracker/component/timeTrackerList";
import {Text} from "tamagui";
import {SafeAreaView} from "react-native-safe-area-context";
import {PageContainer} from "@/src/components/layouts/PageContainer";

const Page = () => {
    const user = useUser()
    if (!user.data) return null;

    const timeTrackers = useGetUsersTimeTrackers(user.data.userId)

    return (
        <PageContainer>
            {timeTrackers.isLoading && <Text>Loading...</Text>}
            {timeTrackers.data && <TimeTrackerList timeTrackers={timeTrackers.data} />}
        </PageContainer>
    )
}

export default Page