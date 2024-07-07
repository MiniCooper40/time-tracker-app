import {useUser} from "@/src/hooks/useUser";
import {useGetUsersTimeTrackers} from "@/src/features/time-tracker/api/useGetUsersTimeTrackers";
import {useGetUsersGroupTrackers} from "@/src/features/group-tracker/api/useGetUsersGroupTrackers";
import {SafeAreaView} from "react-native-safe-area-context";
import {GroupTrackerList} from "@/src/features/group-tracker/components/groupTrackerList";
import {PageContainer} from "@/src/components/layouts/PageContainer";

const Page = () => {
    const user = useUser()
    if (!user.data) return null;

    const groupTrackers = useGetUsersGroupTrackers(user.data.userId)
    return (
        <PageContainer>
            {groupTrackers.data && <GroupTrackerList groupTrackers={groupTrackers.data} />}
        </PageContainer>
    )
}

export default Page