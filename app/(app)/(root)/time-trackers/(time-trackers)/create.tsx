import { CreateTimeTrackerForm } from "@/src/features/time-tracker/component/form/create-time-tracker-form";
import { useUser } from "@/src/hooks/use-user";
import { useRouter } from "expo-router";
import { YStack } from "tamagui";
import { Header } from "@/src/components/header/header";
import { IconButton } from "@/src/components/input/icon-button";
import { BackArrowIcon } from "@/src/components/icons/icons";

const Page = () => {
  const user = useUser();
  const router = useRouter();

  if (user.isFetching || !user.data) return null;
  return (
    <YStack>
      <Header title="Create Tracker">
        <Header.Left>
          <IconButton icon={BackArrowIcon} onPress={router.back} />
        </Header.Left>
      </Header>
      <CreateTimeTrackerForm userId={user.data.userId} />
    </YStack>
  );
};

export default Page;
