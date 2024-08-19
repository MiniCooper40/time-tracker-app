import { View } from "tamagui";
import {ReactNode} from "react";

export const FormPageLayout = ({ children }: {children: ReactNode}) => {
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
