import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "tamagui";
import {ReactNode} from "react";

export const PageContainer = ({ children }: {children: ReactNode}) => {
  return (
    <SafeAreaView>
      <View padding="$4">{children}</View>
    </SafeAreaView>
  );
};
