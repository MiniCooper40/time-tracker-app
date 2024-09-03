import { SignInForm } from "@/src/features/auth/components/sign-in-form";
import { ButtonText, Text, XStack, YStack } from "tamagui";
import {useRouter} from "expo-router";

const SignIn = () => {
  const router = useRouter()
  return (
    <YStack gap="$2">
      <SignInForm />
      <XStack gap="$2">
        <Text>Don't have an account?</Text>
        <ButtonText style={{ textDecorationLine: "underline" }} onPress={() => router.replace("/sign-up")}>Sign up</ButtonText>
      </XStack>
    </YStack>
  );
};

export default SignIn;
