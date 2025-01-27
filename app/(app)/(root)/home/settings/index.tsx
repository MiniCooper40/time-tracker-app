import { Header } from "@/src/components/header/header";
import { Button, Text, YStack } from "tamagui";
import { IconButton } from "@/src/components/input/icon-button";
import { BackArrowIcon } from "@/src/components/icons/icons";
import { useRouter } from "expo-router";
import { signOut } from "@/src/lib/auth";
import { useUser } from "@/src/hooks/use-user";
import {TextButton} from "@/src/components/input/text-button";

const Page = () => {
  const router = useRouter();

  const { data: user } = useUser();

  return (
    <YStack gap="$4">
      <Header title="Settings">
        <Header.Left>
          <IconButton icon={BackArrowIcon} onPress={router.back} />
        </Header.Left>
      </Header>
      <YStack gap="$3">
        <Text>{`Account: ${user ? user.email : "error"}`}</Text>
        <TextButton onPress={signOut}>Sign out</TextButton>
      </YStack>
    </YStack>
  );
};

export default Page;
