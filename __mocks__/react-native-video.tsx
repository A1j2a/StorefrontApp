import React, { FC } from 'react';
import { View, ViewProps } from 'react-native';

interface MockVideoProps extends ViewProps {
  onEnd?: () => void;
  onError?: () => void;
  source?: unknown;
  resizeMode?: string;
  repeat?: boolean;
  muted?: boolean;
}

// Mock implementation of react-native-video for Jest tests
const MockVideo: FC<MockVideoProps> = props => {
  return <View testID="mock-video-player" {...props} />;
};

export default MockVideo;
