import { WithChildren } from "@/src/types/with-children";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "tamagui";

export const PageContainer = ({ children }: WithChildren) => {
  return (
    <SafeAreaView>
      <View padding="$4">{children}</View>
    </SafeAreaView>
  );
};
