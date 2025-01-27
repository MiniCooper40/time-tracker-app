import { rect, SkRect } from "@shopify/react-native-skia";
import { Easing, useSharedValue, withTiming } from "react-native-reanimated";
import { useEffect, useMemo } from "react";
import { sum } from "@/src/util/math";
import { BarChartBarSection } from "@/src/components/charts/bar-chart/bar-chart-bar-section";

interface BarChartBarProps {
  x: number;
  y: number;
  width: number;
  height: number;
  sections: {
    value: number;
    color?: string;
  }[];
  pressed?: boolean;
  opacity?: number;
}

const BarChartBar = ({
  x,
  y,
  width,
  height,
  pressed,
  opacity = 1,
  sections,
}: BarChartBarProps) => {
  const barRect = rect(x, y, width, height);

  const currentHeight = useSharedValue(0);
  useEffect(() => {
    currentHeight.value = withTiming(height, {
      duration: 500,
      easing: Easing.out(Easing.exp),
    });
  });

  const totalValue = useMemo(
    () => sum(...sections.map(({ value }) => value)),
    [sections],
  );

  const sectionPositions = useMemo(() => {
    return sections.map((section, index, sections) => {
      const valuesUntil = sum(
        ...sections.slice(0, index).map(({ value }) => value),
      );
      const heightUntil = (valuesUntil / totalValue) * barRect.height;
      const heightOfSection =
        (sections[index].value / totalValue) * barRect.height;
      return {
        width,
        x,
        y: y + heightUntil,
        height: heightOfSection,
      } as SkRect;
    });
  }, [sections]);

  return (
    <>
      {sectionPositions.map(({ x, y, width, height }, index) => (
        <BarChartBarSection
          sectionTop={y}
          sectionHeight={height}
          color={sections[index].color}
          currentBarHeight={currentHeight}
          key={index}
          barRect={barRect}
          opacity={opacity}
        />
      ))}
    </>
  );
};

export { BarChartBar };
