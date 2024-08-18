import { ReactElement } from "react";
import { Button, ButtonProps, styled } from "tamagui";

type IconButtonProps = {
  icon: ReactElement;
} & ButtonProps;

const IconButtonBase = styled(Button, {
  transparent: true,
  minHeight: "$2",
  paddingVertical: "$2",
  paddingHorizontal: "$3",
  borderRadius: 40,
});

export const IconButton = (props: IconButtonProps) => {
  return <IconButtonBase {...props} />;
};
