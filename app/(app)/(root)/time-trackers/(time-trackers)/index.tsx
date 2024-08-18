import { useUser } from "@/src/hooks/use-user";
import { useGetUsersTimeTrackers } from "@/src/features/time-tracker/api/use-get-users-time-trackers";
import { TimeTrackerList } from "@/src/features/time-tracker/component/time-tracker-list";
import { YStack } from "tamagui";
import { Header } from "@/src/components/header/header";
import { router } from "expo-router";

const Page = () => {
  const user = useUser();
  if (!user.data) return null;

  const timeTrackers = useGetUsersTimeTrackers(user.data.userId);
  return (
    <YStack gap="$4">
      <Header
        title="Time Trackers"
        onAdd={() => router.push("/time-trackers/create")}
      />
      {timeTrackers.data && (
        <TimeTrackerList timeTrackers={timeTrackers.data} />
      )}
    </YStack>
  );
};

export default Page;
