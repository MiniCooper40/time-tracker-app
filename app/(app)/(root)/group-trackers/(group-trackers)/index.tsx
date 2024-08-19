import { useUser } from "@/src/hooks/use-user";
import { useGetUsersGroupTrackers } from "@/src/features/group-tracker/api/use-get-users-group-trackers";
import { GroupTrackerList } from "@/src/features/group-tracker/components/group-tracker-list";
import { YStack } from "tamagui";
import { Header } from "@/src/components/header/header";
import { router } from "expo-router";
import { IconButton } from "@/src/components/input/icon-button";
import { AddIcon } from "@/src/components/icons/icons";

const Page = () => {
  const user = useUser();
  if (!user.data) return null;

  const groupTrackers = useGetUsersGroupTrackers(user.data.userId);
  return (
    <YStack gap="$4">
      <Header title="Group Trackers">
        <Header.Right>
          <IconButton
            icon={AddIcon}
            onPress={() => router.push("/group-trackers/create")}
          />
        </Header.Right>
      </Header>
      {groupTrackers.data && (
        <GroupTrackerList groupTrackers={groupTrackers.data} />
      )}
    </YStack>
  );
};

export default Page;
