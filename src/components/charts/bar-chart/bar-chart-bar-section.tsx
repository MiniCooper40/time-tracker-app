import { RoundedRect, SkRect } from "@shopify/react-native-skia";
import { SharedValue, useDerivedValue } from "react-native-reanimated";

interface BarChartBarSectionProps {
  sectionTop: number;
  sectionHeight: number;
  barRect: SkRect;
  currentBarHeight: SharedValue<number>;
  color?: string;
  pressed?: boolean;
  opacity?: number;
}

const BarChartBarSection = ({
  sectionTop,
  sectionHeight,
  color = "purple",
  pressed,
  opacity = 1,
  currentBarHeight,
  barRect,
}: BarChartBarSectionProps) => {
  const derivedHeight = useDerivedValue(() => {
    return sectionHeight * (currentBarHeight.value / barRect.height);
  });

  const derivedY = useDerivedValue(() => {
    const barBottom = barRect.y + barRect.height;
    const relSectionTop = barBottom - sectionTop;
    const animatedRelSectionTop =
      relSectionTop * (currentBarHeight.value / barRect.height);
    return barBottom - animatedRelSectionTop;
  });

  return (
    <RoundedRect
      r={0}
      x={barRect.x}
      y={derivedY}
      width={barRect.width}
      height={derivedHeight}
      color={color}
      opacity={opacity}
    />
  );
};

export { BarChartBarSection };
