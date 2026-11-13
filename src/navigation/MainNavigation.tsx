import React, { FC, useCallback, useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { useStore } from '../context/StoreContext';
import {
  CartScreen,
  HomeScreen,
  ProductDetailsScreen,
  SplashScreen,
  WelcomeScreen,
} from '../screens';
import { Product } from '../types';

type Route =
  | { name: 'Splash' }
  | { name: 'Welcome' }
  | { name: 'Home' }
  | { name: 'ProductDetails'; product: Product }
  | { name: 'Cart' };

export const MainNavigation: FC = () => {
  const { products } = useStore();
  const [stack, setStack] = useState<Route[]>([{ name: 'Splash' }]);

  const currentRoute = stack[stack.length - 1];

  const goBack = useCallback(() => {
    setStack(prev => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const finishSplash = useCallback(() => {
    setStack([{ name: 'Welcome' }]);
  }, []);

  const resetToHome = useCallback(() => {
    setStack([{ name: 'Home' }]);
  }, []);

  const openProduct = useCallback((product: Product) => {
    setStack(prev => [...prev, { name: 'ProductDetails', product }]);
  }, []);

  const openCart = useCallback(() => {
    setStack(prev => {
      const top = prev[prev.length - 1];
      if (top?.name === 'Cart') {
        return prev;
      }
      return [...prev, { name: 'Cart' }];
    });
  }, []);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (stack.length > 1) {
          goBack();
          return true;
        }
        return false;
      },
    );
    return () => subscription.remove();
  }, [goBack, stack.length]);

  if (currentRoute.name === 'Splash') {
    return <SplashScreen onFinish={finishSplash} />;
  }

  if (currentRoute.name === 'Welcome') {
    return <WelcomeScreen onContinue={resetToHome} />;
  }

  if (currentRoute.name === 'ProductDetails') {
    const liveProduct =
      products.find(p => p.id === currentRoute.product.id) ??
      currentRoute.product;

    return (
      <ProductDetailsScreen
        product={liveProduct}
        onBack={goBack}
        onOpenCart={openCart}
      />
    );
  }

  if (currentRoute.name === 'Cart') {
    return (
      <CartScreen onBack={goBack} onBrowseProducts={resetToHome} />
    );
  }

  return (
    <HomeScreen onSelectProduct={openProduct} onOpenCart={openCart} />
  );
};
