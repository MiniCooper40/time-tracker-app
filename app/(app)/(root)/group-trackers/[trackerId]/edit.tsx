import { useLocalSearchParams } from "expo-router";
import { Text } from "tamagui";
import { useUserId } from "@/src/hooks/use-user";
import { EditGroupTrackerForm } from "@/src/features/group-tracker/components/form/edit-group-tracker-form";

const Page = () => {
  const { trackerId } = useLocalSearchParams();
  const userId = useUserId();

  if (typeof trackerId !== "string" || !userId)
    return <Text>Something went wrong...</Text>;

  return <EditGroupTrackerForm userId={userId} trackerId={trackerId} />;
};

export default Page;
