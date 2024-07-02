import {Slot, Stack} from "expo-router";
import {Authentication} from "@/src/components/Authentication";
import {TamaguiProvider} from "tamagui";
import config from "../tamagui.config"
import {useFonts} from "expo-font";
import {SafeAreaView} from "react-native-safe-area-context";

export default function RootLayout() {

    const [loaded] = useFonts({
        Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
        InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    })

    if (!loaded) {
        return null
    }

  return (
    <TamaguiProvider config={config}>
        <Authentication>
            <SafeAreaView>
                <Slot />
            </SafeAreaView>
        </Authentication>
    </TamaguiProvider>
  );
}
