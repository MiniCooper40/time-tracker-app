import { Link, useLocalSearchParams } from "expo-router";
import {Label, Text, XStack, YStack} from "tamagui";
import { Title } from "@/src/components/typography/title";
import {Subtitle} from "@/src/components/typography/subtitle";

const ConfirmEmail = () => {
  const { email } = useLocalSearchParams<{ email: string }>();

  return (
    <YStack gap="$4" style={{justifyContent: "flex-start", alignItems: "start"}}>
      <Subtitle>Confirm your email</Subtitle>
      <YStack gap="$2">
        <Text>
          {email
            ? `Please check the inbox of ${email} to activate your account`
            : `Please check your inbox to activate your account`}
        </Text>
        <XStack>
          <Text>Done? </Text>
          <Link href="/" style={{ textDecorationLine: "underline" }}>
            <Text>click here</Text>
          </Link>
          <Text> to sign in.</Text>
        </XStack>
      </YStack>
    </YStack>
  );
};

export default ConfirmEmail;
