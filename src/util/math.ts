import { SkPoint, SkRect } from "@shopify/react-native-skia";

export const rectContainsPoint = (rect: SkRect, point: SkPoint) => {
  const { x, y, width, height } = rect;
  return (
    x <= point.x &&
    x + width >= point.x &&
    y <= point.y &&
    y + height >= point.y
  );
};

export const sum = (...args: number[]) => {
  return args.reduce((prev, cur) => prev + cur, 0);
};
