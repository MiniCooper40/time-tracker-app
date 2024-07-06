import {Slot, Stack} from "expo-router";
import {Authentication} from "@/src/components/Authentication";
import {TamaguiProvider} from "tamagui";
import config from "../tamagui.config"
import {useFonts} from "expo-font";
import {SafeAreaView} from "react-native-safe-area-context";
import {QueryClientProvider} from "react-query";
import {queryClient} from "@/src/lib/reactQuery";

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
            <QueryClientProvider client={queryClient}>
                <SafeAreaView>
                    <Slot />
                </SafeAreaView>
            </QueryClientProvider>
        </Authentication>
    </TamaguiProvider>
  );
}
