import {useUser} from "@/src/hooks/useUser";
import {useGetUsersGroupTrackers} from "@/src/features/group-tracker/api/use-get-users-group-trackers";
import {GroupTrackerList} from "@/src/features/group-tracker/components/group-tracker-list";
import {useGetUsersTimeTrackers} from "@/src/features/time-tracker/api/use-get-users-time-trackers";
import {TimeTrackerList} from "@/src/features/time-tracker/component/time-tracker-list";

const Page = () => {
    const user = useUser()
    if (!user.data) return null;

    const timeTrackers = useGetUsersTimeTrackers(user.data.userId)
    return (
        <>
            {timeTrackers.data && <TimeTrackerList timeTrackers={timeTrackers.data} />}
        </>
    )
}

export default Page