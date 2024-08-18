import { LoginForm } from "@/src/features/auth/components/login-form";
import { FormPageLayout } from "@/src/components/layouts/form-page-layout";

const SignIn = () => {
  return (
    <FormPageLayout>
      <LoginForm />
    </FormPageLayout>
  );
};

export default SignIn;
