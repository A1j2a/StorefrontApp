import React, { FC } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StoreProvider } from './context/StoreContext';
import { MainNavigation } from './navigation';

const AppStatusBar: FC = () => {
  return <StatusBar barStyle="dark-content" />;
};

const RootApp: FC = () => {
  return (
    <SafeAreaProvider>
      <StoreProvider>
        <AppStatusBar />
        <MainNavigation />
      </StoreProvider>
    </SafeAreaProvider>
  );
};

export default RootApp;
