import React, { FC } from 'react';
import { Linking, Modal, View } from 'react-native';
import { formatPrice } from '../../common';
import { useStore } from '../../context/StoreContext';
import { shopifyService } from '../../services';
import PrimaryButton from '../PrimaryButton';
import PrimaryText from '../PrimaryText';
import { styles } from './styles';

interface CheckoutModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirmMockOrder: () => void;
}

const CheckoutModal: FC<CheckoutModalProps> = ({
  visible,
  onClose,
  onConfirmMockOrder,
}) => {
  const {
    storeConfig,
    isLiveMode,
    cartId,
    checkoutUrl: liveCheckoutUrl,
    cartItemCount,
    cartSubtotal,
  } = useStore();
  const { theme, currencySymbol } = storeConfig;

  const checkoutDetails = shopifyService.buildProductionCheckoutDetails(
    storeConfig,
    cartId,
    liveCheckoutUrl,
  );

  const handleOpenLiveCheckout = () => {
    if (liveCheckoutUrl) {
      Linking.openURL(liveCheckoutUrl).catch(err => {
        console.warn('[CheckoutModal] Unable to open checkoutUrl:', err);
      });
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View
          style={[
            styles.modalCard,
            {
              backgroundColor: theme.cardColor,
              borderColor: theme.borderColor,
            },
          ]}>
          <PrimaryText style={styles.modalTitle}>
            {isLiveMode && liveCheckoutUrl
              ? 'SHOPIFY HOSTED CHECKOUT'
              : 'MOCK SHOPIFY CHECKOUT'}
          </PrimaryText>
          <PrimaryText style={styles.modalAmount}>
            Total: {formatPrice(cartSubtotal, currencySymbol)} ({cartItemCount}{' '}
            {cartItemCount === 1 ? 'item' : 'items'})
          </PrimaryText>

          <View
            style={[
              styles.urlBox,
              {
                backgroundColor: theme.surfaceColor,
                borderColor: theme.borderColor,
              },
            ]}>
            <PrimaryText muted style={styles.urlLabel}>
              {isLiveMode && liveCheckoutUrl
                ? 'LIVE STOREFRONT CHECKOUT URL'
                : 'PRODUCTION CHECKOUT REDIRECT URL'}
            </PrimaryText>
            <PrimaryText style={styles.urlValue} numberOfLines={2}>
              {checkoutDetails.checkoutUrl}
            </PrimaryText>
          </View>

          <PrimaryText muted style={styles.modalExplain}>
            {checkoutDetails.explanation}
          </PrimaryText>

          <View style={styles.modalActions}>
            <PrimaryButton
              label="CANCEL"
              variant="outline"
              onPress={onClose}
              style={styles.modalBtn}
            />
            {isLiveMode && liveCheckoutUrl ? (
              <PrimaryButton
                label="OPEN SHOPIFY CHECKOUT"
                onPress={handleOpenLiveCheckout}
                style={styles.modalBtn}
              />
            ) : (
              <PrimaryButton
                label="COMPLETE MOCK ORDER"
                onPress={onConfirmMockOrder}
                style={styles.modalBtn}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CheckoutModal;

