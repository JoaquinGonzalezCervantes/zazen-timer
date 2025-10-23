import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@navigation/types';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '@components/Button';
import Card from '@components/Card';
import SessionImage from '@components/SessionImage';
import colors from '@theme/colors';
import { spacing } from '@theme/spacing';
import { typography } from '@theme/typography';
import { getSessionSummaryLines } from '../utils/session';

type Nav = NativeStackNavigationProp<RootStackParamList, 'SessionSummary'>;

export default function SessionSummaryScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<any>();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const sessionType = route.params?.sessionType as 'zazen' | 'complete';

  const lines = useMemo(() => getSessionSummaryLines(sessionType, t), [sessionType, t]);

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.lg }] }>
      <Text style={styles.title}>{t('app.title')}</Text>
      <SessionImage sessionType={sessionType} />
      <Card style={styles.card}>
        {lines.map((l: string, idx: number) => (
          <Text key={idx} style={styles.line}>{l}</Text>
        ))}
      </Card>

      <View style={[styles.bottom, { marginBottom: insets.bottom + spacing.lg }]}>
        <Button
          title={t('buttons.start')}
          onPress={() => navigation.navigate('Timer', { sessionType })}
        />
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
    marginBottom: spacing.xl
  },
  card: {
    width: '100%',
    marginTop: spacing.xl,
    gap: spacing.sm
  },
  line: {
    ...typography.body,
    color: colors.textSecondary
  },
  bottom: {
    marginTop: 'auto',
    width: '100%',
    marginBottom: spacing['2xl']
  }
});
