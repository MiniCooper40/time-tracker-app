import { FormikForm } from "@/src/components/form/formik-form";
import {
  CredentialsInput,
  credentialsInputSchema,
  signUp,
} from "@/src/lib/auth";
import { FormikText } from "@/src/components/form/formik-text";
import { Button, Form, Spinner, Text, YStack } from "tamagui";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Subtitle } from "@/src/components/typography/subtitle";
import { useCreateUser } from "@/src/features/auth/api/create-user";

export const SignUpForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const createUser = useCreateUser();
  const router = useRouter();
  const handleSignUp = async (credentials: CredentialsInput) => {
    setLoading(true);
    await signUp(credentials)
      .then((result) => {
        console.log(`sign up data ${JSON.stringify(result.data)}`);
        console.log(`sign up error ${JSON.stringify(result.error)}`);
        if (result.data.user) {
          createUser.mutate(
            {
              token: result.data.user.id,
              email: credentials.email,
            },
            {
              onSuccess: (user) => {
                console.log(`created user ${JSON.stringify(user)}`);
                router.replace("/");
              },
            },
          );
        }
      })
      .catch(console.log);
    setLoading(false);
  };

  return (
    <FormikForm
      onSubmit={handleSignUp}
      initialValues={{
        email: "",
        password: "",
      }}
      schema={credentialsInputSchema}
    >
      <YStack gap="$4">
        <Subtitle>Sign up</Subtitle>
        <YStack gap="$2">
          <FormikText name="email" label="Email address" />
          <FormikText name="password" label="Password" />
        </YStack>
        <Form.Trigger asChild>
          <Button disabled={loading}>
            {!loading && <Text>Sign in</Text>}
            {loading && <Spinner />}
          </Button>
        </Form.Trigger>
      </YStack>
    </FormikForm>
  );
};
