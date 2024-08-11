import {useUser} from "@/src/hooks/useUser";
import {useGetUsersTimeTrackers} from "@/src/features/time-tracker/api/use-get-users-time-trackers";
import {useGetUsersGroupTrackers} from "@/src/features/group-tracker/api/use-get-users-group-trackers";
import {SafeAreaView} from "react-native-safe-area-context";
import {GroupTrackerList} from "@/src/features/group-tracker/components/group-tracker-list";
import {PageContainer} from "@/src/components/layouts/PageContainer";
import {TrackerPreviewGrid} from "@/src/components/tracker-preview/tracker-preview-grid";
import {YStack} from "tamagui";
import {Title} from "@/src/components/typography/Title";
import { Header } from "@/src/components/header/Header";

const Page = () => {
    const user = useUser()
    if (!user.data) return null;

    const groupTrackers = useGetUsersGroupTrackers(user.data.userId)
    return (
        <YStack gap="$4">
            <Header title="Group Trackers" onAdd={() => {}} />
            {groupTrackers.data && <GroupTrackerList groupTrackers={groupTrackers.data} />}
        </YStack>
    )
}

export default Page