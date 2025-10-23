import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@navigation/types';
import { useTranslation } from 'react-i18next';
import Button from '@components/Button';
import Card from '@components/Card';
import { getSessionSummaryLines } from '../utils/session';
import SessionImage from '@components/SessionImage';
import colors from '@theme/colors';
import { spacing } from '@theme/spacing';
import { typography } from '@theme/typography';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Landing'>;

export default function LandingScreen() {
  const navigation = useNavigation<Nav>();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + spacing.lg }] }>
      <Text style={styles.title}>{t('app.title')}</Text>

      <View style={styles.cards}>
        {/* Zazen session card */}
        <Card style={[styles.card, styles.cardSpacing]}>
          <View style={styles.cardHeader}>
            <SessionImage sessionType="zazen" />
          </View>
          <View style={styles.details}>
            {getSessionSummaryLines('zazen', t).map((line: string, idx: number) => (
              <Text key={`z-${idx}`} style={styles.detailText}>{line}</Text>
            ))}
          </View>
          <Button
            title={t('buttons.start')}
            onPress={() => navigation.navigate('Timer', { sessionType: 'zazen' })}
            style={styles.cardButton}
          />
        </Card>

        {/* Complete session card */}
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <SessionImage sessionType="complete" />
          </View>
          <View style={styles.details}>
            {getSessionSummaryLines('complete', t).map((line: string, idx: number) => (
              <Text key={`c-${idx}`} style={styles.detailText}>{line}</Text>
            ))}
          </View>
          <Button
            title={t('buttons.start')}
            onPress={() => navigation.navigate('Timer', { sessionType: 'complete' })}
            style={styles.cardButton}
          />
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    paddingHorizontal: spacing.xl
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
    marginBottom: spacing['2xl']
  },
  cards: {
    width: '100%',
    // gap is not reliably supported across RN versions
  },
  card: {
    width: '100%'
  },
  cardSpacing: {
    marginBottom: spacing.lg
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: spacing.lg
  },
  details: {
    marginBottom: spacing.lg
  },
  detailText: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm
  },
  cardButton: {
    width: '100%'
  }
});
