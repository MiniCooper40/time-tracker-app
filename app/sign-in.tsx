import {LoginForm} from "@/src/features/auth/components/loginForm";
import {View} from "tamagui";
import {FormPageLayout} from "@/src/components/layouts/FormPageLayout";

const SignIn = () => {
    return (
        <FormPageLayout>
            <LoginForm />
        </FormPageLayout>
    )
}

export default SignIn