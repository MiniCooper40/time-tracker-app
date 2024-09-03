import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, YStack } from "tamagui";
import { EditTimeTrackerForm } from "@/src/features/time-tracker/component/form/edit-time-tracker-form";
import { useUserId } from "@/src/hooks/use-user";
import { Header } from "@/src/components/header/header";
import { IconButton } from "@/src/components/input/icon-button";
import { BackArrowIcon } from "@/src/components/icons/icons";
import { useGetTimeTracker } from "@/src/features/time-tracker/api/use-get-time-tracker";

const Page = () => {
  const { trackerId } = useLocalSearchParams();
  const userId = useUserId();
  const router = useRouter();

  if (typeof trackerId !== "string" || !userId)
    return <Text>Something went wrong...</Text>;

  return (
    <YStack>
      <Header title="Edit Tracker">
        <Header.Left>
          <IconButton icon={BackArrowIcon} onPress={router.back} />
        </Header.Left>
      </Header>
      <EditTimeTrackerForm userId={userId} trackerId={trackerId} />
    </YStack>
  );
};

export default Page;
