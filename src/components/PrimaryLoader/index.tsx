import React, { FC } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useStore } from '../../context/StoreContext';
import PrimaryText from '../PrimaryText';
import { styles } from './styles';

interface PrimaryLoaderProps {
  message?: string;
}

const PrimaryLoader: FC<PrimaryLoaderProps> = ({
  message = 'Loading storefront...',
}) => {
  const { storeConfig } = useStore();

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={storeConfig.theme.primaryColor} />
      <PrimaryText muted style={styles.text}>
        {message}
      </PrimaryText>
    </View>
  );
};

export default PrimaryLoader;

