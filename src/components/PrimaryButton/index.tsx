import React, { FC } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { useStore } from '../../context/StoreContext';
import PrimaryText from '../PrimaryText';
import { styles } from './styles';

interface PrimaryButtonProps extends TouchableOpacityProps {
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  variant?: 'solid' | 'outline';
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  label,
  labelStyle,
  loading = false,
  disabled,
  variant = 'solid',
  style,
  ...rest
}) => {
  const { storeConfig } = useStore();
  const isDisabled = disabled || loading;
  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isOutline
          ? [
              styles.outlineContainer,
              { borderColor: storeConfig.theme.primaryColor },
            ]
          : {
              backgroundColor: storeConfig.theme.primaryColor,
            },
        isDisabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.75}
      disabled={isDisabled}
      {...rest}>
      <PrimaryText
        style={[
          styles.label,
          {
            color: isOutline
              ? storeConfig.theme.primaryColor
              : storeConfig.theme.onPrimaryColor,
          },
          labelStyle,
          loading && styles.hiddenLabel,
        ]}>
        {label}
      </PrimaryText>

      {loading && (
        <ActivityIndicator
          color={
            isOutline
              ? storeConfig.theme.primaryColor
              : storeConfig.theme.onPrimaryColor
          }
          size="small"
          style={styles.spinner}
        />
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

