import { SkFont, Text } from "@shopify/react-native-skia";

interface BarChartLabelProps {
  x: number | undefined;
  y: number | undefined;
  font: SkFont | null;
  text: string | number;
  color: string;
}

const BarChartLabel = ({ x, y, font, text, color }: BarChartLabelProps) => {
  // const opacity = useSharedValue(0)
  //
  // useEffect(() => {
  //     opacity.value = withTiming(1, {
  //         duration: 200
  //     })
  // }, []);

  return (
    <Text
      font={font}
      text={text.toString()}
      x={x}
      y={y}
      color={color}
      // opacity={opacity}
    />
  );
};

export { BarChartLabel };
