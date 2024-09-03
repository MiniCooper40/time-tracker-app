import {
  animations,
  media,
  shorthands,
  themes,
  tokens,
} from "@tamagui/config/v3";
import { createFont, createTamagui } from "tamagui";

const headingFont = createFont({
  family: "Rubik",
  size: {
    2: 5,
    5: 13,
    6: 15,
    7: 20,
    9: 32,
    10: 44,
  },
  transform: {
    6: "uppercase",
    7: "none",
  },
  weight: {
    6: "400",
    7: "700",
  },
  color: {
    6: "$colorFocus",
    7: "$color",
  },
  letterSpacing: {
    5: 2,
    6: 1,
    7: 0,
    8: 0,
    9: -1,
    10: -1.5,
    12: -2,
    14: -3,
    15: -4,
  },
  // for native
  face: {
    900: { normal: "RubikRegular" },
    800: { normal: "RubikMedium" },
    700: { normal: "RubikSemiBold" },
    600: { normal: "RubikBold" },
  },
});

const bodyFont = createFont({
  family: "Rubik",
  size: {
    2: 5,
    4: 11,
    5: 13,
    6: 15,
    7: 20,
    9: 32,
    10: 44,
  },
  transform: {
    6: "uppercase",
    7: "none",
  },
  weight: {
    6: "400",
    7: "700",
  },
  color: {
    6: "$colorFocus",
    7: "$color",
  },
  letterSpacing: {
    5: 2,
    6: 1,
    7: 0,
    8: 0,
    9: -1,
    10: -1.5,
    12: -2,
    14: -3,
    15: -4,
  },
  // for native
  face: {
    400: { normal: "RubikLight" },
    800: { normal: "RubikRegular" },
    900: { normal: "RubikMedium" },
  },
});

const appConfig = createTamagui({
  tokens,
  animations,
  themes,
  shorthands,
  media,
  fonts: {
    body: bodyFont,
    heading: headingFont,
  },
});

type AppConfig = typeof appConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;
