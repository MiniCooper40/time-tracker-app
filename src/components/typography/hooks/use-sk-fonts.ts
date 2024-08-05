import {useFont} from "@shopify/react-native-skia";

export const useChartLabelFont = () => useFont(require("@/assets/fonts/Lato/Lato-Regular.ttf"), 12)
export const useTooltipTitleFont = () => useFont(require("@/assets/fonts/Oswald/static/Oswald-Bold.ttf"), 16)
export const useTooltipBodyFont = () => useFont(require("@/assets/fonts/Lato/Lato-Regular.ttf"), 12)