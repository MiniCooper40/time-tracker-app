import {ReactElement} from "react";
import {Button, ButtonProps, styled} from "tamagui";

type IconButtonProps = {
    icon: ReactElement
} & ButtonProps

const IconButtonBase = styled(Button, {
    transparent: true
})

export const IconButton = (props: IconButtonProps) => {
    return (
        <IconButtonBase {...props} style={{backgroundColor: "blue"}} />
    )
}