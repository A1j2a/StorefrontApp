import React, { FC, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { useStore } from '../../context/StoreContext';
import { reviewsService } from '../../services';
import { colors } from '../../theme';
import { ReviewsResponse } from '../../types';
import PrimaryText from '../PrimaryText';
import { styles } from './styles';

interface ReviewsSectionProps {
  productId: string;
}

const ReviewsSection: FC<ReviewsSectionProps> = ({ productId }) => {
  const { storeConfig } = useStore();
  const { theme } = storeConfig;

  const [simulateUnavailable, setSimulateUnavailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ReviewsResponse | null>(null);

  const loadReviews = useCallback(
    async (unavailableMode: boolean) => {
      setLoading(true);
      const response = await reviewsService.fetchProductReviews(productId, {
        simulateUnavailable: unavailableMode,
      });
      setData(response);
      setLoading(false);
    },
    [productId],
  );

  useEffect(() => {
    loadReviews(simulateUnavailable);
  }, [loadReviews, simulateUnavailable]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.cardColor,
          borderColor: theme.borderColor,
        },
      ]}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <PrimaryText style={styles.sectionTitle}>
            VERIFIED REVIEWS
          </PrimaryText>
          <PrimaryText muted style={styles.providerLabel}>
            Mocked 3rd-Party Adapter (Judge.me / Yotpo pattern)
          </PrimaryText>
        </View>

        <TouchableOpacity
          onPress={() => setSimulateUnavailable(prev => !prev)}
          style={[
            styles.togglePill,
            {
              backgroundColor: simulateUnavailable
                ? colors.warningBg
                : theme.surfaceColor,
              borderColor: theme.borderColor,
            },
          ]}>
          <PrimaryText
            style={[
              styles.toggleText,
              {
                color: simulateUnavailable ? colors.warning : theme.textColor,
              },
            ]}>
            {simulateUnavailable ? 'State: Unavailable' : 'State: Success'}
          </PrimaryText>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="small" color={theme.primaryColor} />
          <PrimaryText muted style={styles.loadingText}>
            Loading reviews...
          </PrimaryText>
        </View>
      ) : data?.status === 'unavailable' ? (
        <View
          style={[styles.fallbackBox, { backgroundColor: colors.warningBg }]}>
          <PrimaryText style={[styles.fallbackTitle, { color: colors.warning }]}>
            Reviews Temporarily Unavailable
          </PrimaryText>
          <PrimaryText style={styles.fallbackBody}>
            {data.fallbackMessage}
          </PrimaryText>
          <TouchableOpacity
            onPress={() => setSimulateUnavailable(false)}
            style={styles.retryLink}>
            <PrimaryText
              style={[styles.retryLinkText, { color: theme.primaryColor }]}>
              Restore Available State
            </PrimaryText>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <View style={styles.summaryRow}>
            <PrimaryText style={styles.ratingBig}>
              {data?.averageRating.toFixed(1)} ★
            </PrimaryText>
            <PrimaryText muted style={styles.countText}>
              Based on {data?.totalCount ?? 0} verified reviews
            </PrimaryText>
          </View>

          {data?.reviews.map(review => (
            <View
              key={review.id}
              style={[
                styles.reviewItem,
                { borderTopColor: theme.borderColor },
              ]}>
              <View style={styles.reviewTop}>
                <PrimaryText style={styles.reviewStars}>
                  {'★'.repeat(review.rating)}
                  {'☆'.repeat(5 - review.rating)}
                </PrimaryText>
                <PrimaryText muted style={styles.reviewMeta}>
                  {review.author} • {review.date}
                </PrimaryText>
              </View>
              <PrimaryText style={styles.reviewTitle}>
                {review.title}
              </PrimaryText>
              <PrimaryText muted style={styles.reviewComment}>
                {review.comment}
              </PrimaryText>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default ReviewsSection;

