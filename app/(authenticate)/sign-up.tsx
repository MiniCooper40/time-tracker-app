import { ButtonText, Text, XStack, YStack } from "tamagui";
import { useRouter } from "expo-router";
import { SignUpForm } from "@/src/features/auth/components/sign-up-form";

const SignUp = () => {
  const router = useRouter();
  return (
    <YStack gap="$3">
      <SignUpForm />
      <XStack gap="$2">
        <Text>Already have an account?</Text>
        <ButtonText
          style={{ textDecorationLine: "underline" }}
          onPress={() => router.replace("/")}
        >
          Sign in
        </ButtonText>
      </XStack>
    </YStack>
  );
};

export default SignUp;
