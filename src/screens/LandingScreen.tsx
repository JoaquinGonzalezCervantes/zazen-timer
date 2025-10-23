import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@navigation/types';
import { useTranslation } from 'react-i18next';
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
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.container, { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + spacing.lg }]}
    >
      <Text style={styles.title}>{t('app.title')}</Text>

      <View style={styles.cards}>
        {/* Zazen session card */}
        <Card
          style={[styles.card, styles.cardSpacing]}
          onPress={() => navigation.navigate('SessionSummary', { sessionType: 'zazen' })}
        >
          <View style={styles.cardHeader}>
            <SessionImage sessionType="zazen" />
          </View>
          <View style={styles.details}>
            {getSessionSummaryLines('zazen', t).map((line: string, idx: number) => (
              <Text key={`z-${idx}`} style={styles.detailText}>{line}</Text>
            ))}
          </View>
        </Card>

        {/* Complete session card */}
        <Card
          style={styles.card}
          onPress={() => navigation.navigate('SessionSummary', { sessionType: 'complete' })}
        >
          <View style={styles.cardHeader}>
            <SessionImage sessionType="complete" />
          </View>
          <View style={styles.details}>
            {getSessionSummaryLines('complete', t).map((line: string, idx: number) => (
              <Text key={`c-${idx}`} style={styles.detailText}>{line}</Text>
            ))}
          </View>
        </Card>
      </View>
    </ScrollView>
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
  
});
