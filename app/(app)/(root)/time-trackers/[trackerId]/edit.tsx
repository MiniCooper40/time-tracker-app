import {useLocalSearchParams} from "expo-router";
import {Text} from "tamagui";
import {EditTimeTrackerForm} from "@/src/features/time-tracker/component/form/edit-time-tracker-form";
import {useUserId} from "@/src/hooks/useUser";

const Page = () => {
    const {trackerId} = useLocalSearchParams()
    const userId  = useUserId()

    if (typeof trackerId !== "string" || !userId) return <Text>Something went wrong...</Text>

    return <EditTimeTrackerForm userId={userId} trackerId={trackerId} />
}

export default Page