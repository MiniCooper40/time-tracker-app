import {Spinner, YStack} from "tamagui";

export const LoadingPage = () => {
  return (
      <YStack style={{height: "100%", width: "100%", justifyContent: "center", alignItems: "center"}}>
        <Spinner size="large" />
      </YStack>
  )
}