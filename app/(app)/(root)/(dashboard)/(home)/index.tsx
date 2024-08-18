import { Text } from "react-native";
import { Button, YStack } from "tamagui";
import { signOut } from "@/src/lib/auth";
import { useUser } from "@/src/hooks/use-user";
import { detailedLabelForDay } from "@/src/util/time";
import { Header } from "@/src/components/header/header";

const Page = () => {
  const user = useUser();
  if (!user.data) return null;

  const labelForToday = detailedLabelForDay();

  return (
    <YStack gap="$4">
      <Header title={labelForToday} />
      <Button onPress={signOut}>Sign out</Button>
    </YStack>
  );
};

export default Page;
