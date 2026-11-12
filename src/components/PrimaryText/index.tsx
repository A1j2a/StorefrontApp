import React, { FC } from 'react';
import { Text, TextProps } from 'react-native';
import { useStore } from '../../context/StoreContext';
import { styles } from './styles';

interface PrimaryTextProps extends TextProps {
  muted?: boolean;
}

const PrimaryText: FC<PrimaryTextProps> = ({
  style,
  muted = false,
  children,
  ...props
}) => {
  const { storeConfig } = useStore();
  const baseColor = muted
    ? storeConfig.theme.mutedTextColor
    : storeConfig.theme.textColor;

  return (
    <Text style={[styles.text, { color: baseColor }, style]} {...props}>
      {children}
    </Text>
  );
};

export default PrimaryText;

