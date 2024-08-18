import { useFont } from "@shopify/react-native-skia";

export const useChartLabelFont = () =>
  useFont(require("@/assets/fonts/Rubik/static/Rubik-Light.ttf"), 12);
export const useTooltipTitleFont = () =>
  useFont(require("@/assets/fonts/Rubik/static/Rubik-Regular.ttf"), 14);
export const useTooltipBodyFont = () =>
  useFont(require("@/assets/fonts/Rubik/static/Rubik-Light.ttf"), 13);
