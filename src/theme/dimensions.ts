import { Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('screen');

type DesignSize = { width: number; height: number };

const CURRENT_RESOLUTION = Math.sqrt(height * height + width * width);

const create = (designSize: DesignSize): ((size: number) => number) => {
  const DESIGN_RESOLUTION = Math.sqrt(
    designSize.height * designSize.height + designSize.width * designSize.width,
  );
  const RESOLUTIONS_PROPORTION = CURRENT_RESOLUTION / DESIGN_RESOLUTION;
  return (size: number) => Number((RESOLUTIONS_PROPORTION * size).toFixed());
};

const designResolution: DesignSize = {
  width: 430,
  height: 932,
};

export const perfectSize = create(designResolution);

