import {LoginForm} from "@/src/features/auth/components/loginForm";
import {View} from "tamagui";

const SignIn = () => {
    return (
        <View
            padding="$4"
            height="100%"
            alignContent="center"
            justifyContent="center"
        >
            <LoginForm />
        </View>
    )
}

export default SignIn