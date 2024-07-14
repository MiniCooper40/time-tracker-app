import {SizableText, styled} from "tamagui";

export const Label = styled(SizableText, {
    name: "label",
    tag: "label",
    size: "$5"
})

export const OutlinedLabel = styled(Label, {
    borderRadius: "$1",
    borderWidth: "$1",
    borderStyle: "solid",
    paddingHorizontal: "$2",
    width: "fit-content",
    whiteSpace: "discard-after"
})