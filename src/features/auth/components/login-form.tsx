import { FormikForm } from "@/src/components/form/formik-form";
import {
  CredentialsInput,
  credentialsInputSchema,
  signIn,
} from "@/src/lib/auth";
import { FormikText } from "@/src/components/form/formik-text";
import { Button, Form, Spinner, Text, YStack } from "tamagui";
import { router } from "expo-router";
import { useState } from "react";

export const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (credentials: CredentialsInput) => {
    setLoading(true);
    await signIn(credentials)
      .then((result) => {
        if (result.data.session) router.push("/");
      })
      .catch(console.log);
    setLoading(false);
  };

  return (
    <FormikForm
      title="Sign in"
      onSubmit={handleLogin}
      initialValues={{
        email: "rthomlinson03@gmail.com",
        password: "SpringTest1!",
      }}
      schema={credentialsInputSchema}
    >
      <YStack gap="$4">
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
