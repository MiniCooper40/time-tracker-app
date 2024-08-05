import {Slot, SplashScreen} from "expo-router";
import {AuthenticationProvider} from "@/src/components/providers/AuthenticationProvider";
import {TamaguiProvider} from "tamagui";
import config from "../tamagui.config"
import {useFonts} from "expo-font";
import {QueryClientProvider} from "react-query";
import {queryClient} from "@/src/lib/reactQuery";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {useEffect} from "react";

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {

    const [loaded] = useFonts({
        Inter: require('@/assets/fonts/Lato/Lato-Regular.ttf'),
        InterBold: require('@/assets/fonts/Oswald/static/Oswald-Bold.ttf'),
        InterLight: require('@/assets/fonts/Lato/Lato-Light.ttf')
    })

    useEffect(() => {
        if (loaded) SplashScreen.hideAsync()
    }, [loaded]);

    if (!loaded) {
        return null
    }

  return (
    <TamaguiProvider config={config}>
        <AuthenticationProvider>
            <QueryClientProvider client={queryClient}>
                <GestureHandlerRootView>
                    <Slot />
                </GestureHandlerRootView>
            </QueryClientProvider>
        </AuthenticationProvider>
    </TamaguiProvider>
  );
}
