import { Slot, SplashScreen } from "expo-router";
import { AuthenticationProvider } from "@/src/components/providers/authentication-provider";
import { TamaguiProvider } from "tamagui";
import config from "../tamagui.config";
import { useFonts } from "expo-font";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/src/lib/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ToastProvider } from "@tamagui/toast";
import {TimeTrackingProvider} from "@/src/components/providers/time-tracking-provider";
import {signOut} from "@/src/lib/auth";
import {supabase} from "@/src/lib/supabase";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    RubikLight: require("@/assets/fonts/Rubik/static/Rubik-Light.ttf"),
    RubikRegular: require("@/assets/fonts/Rubik/static/Rubik-Regular.ttf"),
    RubikMedium: require("@/assets/fonts/Rubik/static/Rubik-Medium.ttf"),
    RubikBold: require("@/assets/fonts/Rubik/static/Rubik-Bold.ttf"),
    Rubik: require("@/assets/fonts/Rubik/static/Rubik-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
    // signOut().then(res => {
    //   console.log(`sign out result: ${JSON.stringify(res)}`)
    // })
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <TamaguiProvider config={config}>
        <ToastProvider>
          <AuthenticationProvider>
            <QueryClientProvider client={queryClient}>
              <TimeTrackingProvider>
                <GestureHandlerRootView>
                  <Slot />
                </GestureHandlerRootView>
              </TimeTrackingProvider>
            </QueryClientProvider>
          </AuthenticationProvider>
        </ToastProvider>
      </TamaguiProvider>
    </>
  );
}
