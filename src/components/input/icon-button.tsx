import { ReactElement } from "react";
import { Button, ButtonProps, styled } from "tamagui";

type IconButtonProps = {
  icon: ReactElement;
} & ButtonProps;

const IconButtonBase = styled(Button, {
  transparent: true,
  minHeight: "$2",
  borderRadius: 40,
  circular: true
});

export const IconButton = (props: IconButtonProps) => {
  return <IconButtonBase {...props} />;
};
