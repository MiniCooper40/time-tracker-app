import {Slot} from "expo-router";
import {AuthenticationProvider} from "@/src/components/providers/AuthenticationProvider";
import {TamaguiProvider} from "tamagui";
import config from "../tamagui.config"
import {useFonts} from "expo-font";
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
        <AuthenticationProvider>
            <QueryClientProvider client={queryClient}>
                <Slot />
            </QueryClientProvider>
        </AuthenticationProvider>
    </TamaguiProvider>
  );
}
