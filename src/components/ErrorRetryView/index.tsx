import React, { FC } from 'react';
import { View } from 'react-native';
import { useStore } from '../../context/StoreContext';
import { colors } from '../../theme';
import PrimaryButton from '../PrimaryButton';
import PrimaryText from '../PrimaryText';
import { styles } from './styles';

interface ErrorRetryViewProps {
  message: string;
  onRetry: () => void;
}

const ErrorRetryView: FC<ErrorRetryViewProps> = ({ message, onRetry }) => {
  const { storeConfig } = useStore();

  return (
    <View style={styles.container}>
      <View style={[styles.iconBox, { backgroundColor: colors.dangerBg }]}>
        <PrimaryText style={[styles.iconText, { color: colors.danger }]}>
          !
        </PrimaryText>
      </View>
      <PrimaryText style={styles.heading}>Something went wrong</PrimaryText>
      <PrimaryText muted style={styles.message}>
        {message}
      </PrimaryText>
      <PrimaryButton
        label="RETRY"
        onPress={onRetry}
        style={[
          styles.retryBtn,
          { backgroundColor: storeConfig.theme.primaryColor },
        ]}
      />
    </View>
  );
};

export default ErrorRetryView;

