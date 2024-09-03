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

export const SignUpForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const router = useRouter();
  const handleSignUp = async (credentials: CredentialsInput) => {
    setError(undefined);
    setLoading(true);
    await signUp(credentials)
      .then(() => {
        router.setParams({ email: credentials.email });
        router.replace({
          pathname: "/confirm-email",
          params: { email: credentials.email },
        });
      })
      .catch(setError)
      .finally(() => setLoading(false));
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
        <>
          <Subtitle>Sign up</Subtitle>
          <YStack gap="$2">
            <FormikText name="email" label="Email address" />
            <FormikText name="password" label="Password" />
          </YStack>
          <Form.Trigger asChild>
            <Button disabled={loading}>
              {!loading && <Text>Sign up</Text>}
              {loading && <Spinner />}
            </Button>
          </Form.Trigger>
        </>
        {error && <Text color="red">{error}</Text>}
      </YStack>
    </FormikForm>
  );
};
