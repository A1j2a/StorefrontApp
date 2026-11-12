import React, { FC, useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  AppHeader,
  CartEmptyState,
  CartItemCard,
  CartSummaryFooter,
  CheckoutModal,
  PrimaryLoader,
} from '../../components';
import { useStore } from '../../context/StoreContext';
import { styles } from './styles';

interface CartScreenProps {
  onBack: () => void;
  onBrowseProducts: () => void;
}

const CartScreen: FC<CartScreenProps> = ({ onBack, onBrowseProducts }) => {
  const {
    storeConfig,
    cartItems,
    isCartHydrated,
    updateCartQuantity,
    removeFromCart,
    clearCart,
  } = useStore();
  const { theme } = storeConfig;

  const [checkoutModalVisible, setCheckoutModalVisible] = useState(false);

  const handleConfirmMockCheckout = () => {
    setCheckoutModalVisible(false);
    clearCart();
    onBrowseProducts();
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.backgroundColor }]}>
      <AppHeader
        title="YOUR BAG"
        showBack
        onBackPress={onBack}
        showCart={false}
        showStoreSwitcher={false}
      />

      {!isCartHydrated ? (
        <PrimaryLoader message="Restoring saved bag..." />
      ) : cartItems.length === 0 ? (
        <CartEmptyState onBrowseProducts={onBrowseProducts} />
      ) : (
        <>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            {cartItems.map(item => (
              <CartItemCard
                key={item.variantId}
                item={item}
                onUpdateQuantity={updateCartQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </ScrollView>

          <CartSummaryFooter
            onCheckoutPress={() => setCheckoutModalVisible(true)}
          />
        </>
      )}

      <CheckoutModal
        visible={checkoutModalVisible}
        onClose={() => setCheckoutModalVisible(false)}
        onConfirmMockOrder={handleConfirmMockCheckout}
      />
    </View>
  );
};

export default CartScreen;
