import {WithChildren} from "@/src/types/WithChildren";
import {SafeAreaView} from "react-native-safe-area-context";
import {View} from "tamagui";

export const PageContainer = ({children}: WithChildren) => {
    return (
        <View padding="$4">
            {children}
        </View>
    )
}