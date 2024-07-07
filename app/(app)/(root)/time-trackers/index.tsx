import {useUser} from "@/src/hooks/useUser";
import {useGetUsersTimeTrackers} from "@/src/features/time-tracker/api/use-get-users-time-trackers";
import {TimeTrackerList} from "@/src/features/time-tracker/component/time-tracker-list";
import {Text} from "tamagui";
import {SafeAreaView} from "react-native-safe-area-context";
import {PageContainer} from "@/src/components/layouts/PageContainer";

const Page = () => {
    const user = useUser()
    if (!user.data) return null;

    const timeTrackers = useGetUsersTimeTrackers(user.data.userId)

    return (
        <>
            {timeTrackers.isLoading && <Text>Loading...</Text>}
            {timeTrackers.data && <TimeTrackerList timeTrackers={timeTrackers.data} />}
        </>
    )
}

export default Page