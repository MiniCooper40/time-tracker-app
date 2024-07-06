import {WithChildren} from "@/src/types/WithChildren";
import {View} from "tamagui";
import {LoginForm} from "@/src/features/auth/components/loginForm";

export const FormPageLayout = ({children}: WithChildren) => {

    return (
        <View
            padding="$4"
            height="100%"
            alignContent="center"
            justifyContent="center"
        >
            {children}
        </View>
    )
}