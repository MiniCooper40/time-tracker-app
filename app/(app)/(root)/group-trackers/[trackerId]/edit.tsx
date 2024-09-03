import { useLocalSearchParams, useRouter } from "expo-router";
import {Text, YStack} from "tamagui";
import { useUserId } from "@/src/hooks/use-user";
import { EditGroupTrackerForm } from "@/src/features/group-tracker/components/form/edit-group-tracker-form";
import { useGetGroupTracker } from "@/src/features/group-tracker/api/use-get-group-tracker";
import { Header } from "@/src/components/header/header";
import { IconButton } from "@/src/components/input/icon-button";
import { BackArrowIcon } from "@/src/components/icons/icons";

const Page = () => {
  const { trackerId } = useLocalSearchParams();
  const userId = useUserId();
  const router = useRouter();

  if (typeof trackerId !== "string" || !userId)
    return <Text>Something went wrong...</Text>;

  return (
    <YStack>
      <Header title="Edit Group">
        <Header.Left>
          <IconButton icon={BackArrowIcon} onPress={router.back} />
        </Header.Left>
      </Header>
      <EditGroupTrackerForm userId={userId} trackerId={trackerId} />
    </YStack>
  );
};

export default Page;
