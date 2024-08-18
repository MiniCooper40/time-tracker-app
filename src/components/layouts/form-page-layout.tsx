import { WithChildren } from "@/src/types/with-children";
import { View } from "tamagui";

export const FormPageLayout = ({ children }: WithChildren) => {
  return (
    <View
      padding="$4"
      height="100%"
      alignContent="center"
      justifyContent="center"
    >
      {children}
    </View>
  );
};
