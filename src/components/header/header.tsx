import { XStack } from "tamagui";
import { Title } from "@/src/components/typography/title";
import { ReactNode } from "react";

interface HeaderProps {
  title: string;
  children?: ReactNode;
}

export const Header = ({ title, children }: HeaderProps) => {
  return (
    <XStack
      justifyContent="center"
      alignItems="center"
      width="100%"
      position="relative"
    >
      <XStack>
        <Title>{title}</Title>
      </XStack>
      {children}
    </XStack>
  );
};

Header.Right = ({ children }: { children: ReactNode }) => {
  return (
    <XStack
      gap="$2"
      justifyContent="flex-end"
      alignItems="center"
      paddingRight="$2"
      right={0}
      position="absolute"
    >
      {children}
    </XStack>
  );
};

Header.Left = ({ children }: { children: ReactNode }) => {
  return (
    <XStack gap="$2" paddingLeft="$2" left={0} position="absolute">
      {children}
    </XStack>
  );
};
