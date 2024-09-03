import { useUser } from "@/src/hooks/use-user";
import { CreateGroupTrackerForm } from "@/src/features/group-tracker/components/form/create-group-tracker-form";
import { YStack } from "tamagui";
import { useRouter } from "expo-router";
import { Header } from "@/src/components/header/header";
import { IconButton } from "@/src/components/input/icon-button";
import { BackArrowIcon } from "@/src/components/icons/icons";

const Page = () => {
  const user = useUser();
  const router = useRouter();

  if (user.isFetching || !user.data) return null;
  return (
    <YStack>
      <Header title="Create Group">
        <Header.Left>
          <IconButton icon={BackArrowIcon} onPress={router.back} />
        </Header.Left>
      </Header>
      <CreateGroupTrackerForm userId={user.data.userId} />
    </YStack>
  );
};

export default Page;
