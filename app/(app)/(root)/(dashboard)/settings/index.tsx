import { Header } from "@/src/components/header/header";
import { Button, YStack } from "tamagui";
import { IconButton } from "@/src/components/input/icon-button";
import { BackArrowIcon } from "@/src/components/icons/icons";
import { useRouter } from "expo-router";
import { signOut } from "@/src/lib/auth";

const Page = () => {
  const router = useRouter();
  return (
    <YStack gap="$4">
      <Header title="Settings">
        <Header.Left>
          <IconButton icon={BackArrowIcon} onPress={router.back} />
        </Header.Left>
      </Header>
      <Button onPress={signOut}>Sign out</Button>
    </YStack>
  );
};

export default Page;
