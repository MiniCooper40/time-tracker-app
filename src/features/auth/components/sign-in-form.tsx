import { FormikForm } from "@/src/components/form/formik-form";
import {
  CredentialsInput,
  credentialsInputSchema,
  signIn,
} from "@/src/lib/auth";
import { FormikText } from "@/src/components/form/formik-text";
import { Button, Card, Form, Spinner, Text, YStack } from "tamagui";
import { useState } from "react";
import { Subtitle } from "@/src/components/typography/subtitle";

export const SignInForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isUnconfirmed, setIsUnconfirmed] = useState(false);
  const handleLogin = async (credentials: CredentialsInput) => {
    console.log("in handle login", credentials);
    setLoading(true);
    await signIn(credentials)
      .then(() => {
        console.log("logged in, rerouting");
      })
      .catch((err) => {
        console.error(`sign in err`, err);
        setIsUnconfirmed(true);
      })
      .finally(() => setLoading(false));
  };

  return (
    <YStack gap="$2">
      <FormikForm
        onSubmit={handleLogin}
        initialValues={{
          email: "",
          password: "",
        }}
        schema={credentialsInputSchema}
      >
        <YStack gap="$4">
          <Subtitle>Sign in</Subtitle>
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
      {isUnconfirmed && (
        <Card>
          <Text>
            Please confirm your email. Check your email inbox for a confirmation
            link.
          </Text>
        </Card>
      )}
    </YStack>
  );
};
