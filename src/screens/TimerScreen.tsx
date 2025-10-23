import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@navigation/types';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '@theme/colors';
import { spacing } from '@theme/spacing';
import { typography } from '@theme/typography';
import SessionImage from '@components/SessionImage';
import useTimer from '@hooks/useTimer';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Timer'>;

export default function TimerScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<any>();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  // Guard against missing or invalid sessionType
  const paramType = route.params?.sessionType;
  const sessionType: 'zazen' | 'complete' = paramType === 'complete' ? 'complete' : 'zazen';
  const { currentPeriod, timeDisplay, stop } = useTimer(sessionType);

  useEffect(() => {
    const unsub = navigation.addListener('beforeRemove', () => {
      stop();
    });
    return unsub;
  }, [navigation, stop]);

  const periodLabel = t(`periods.${currentPeriod.type}`);
  const unitLabel = t(timeDisplay.unitKey);

  // Map current period to the appropriate image mode
  const periodMode = currentPeriod.type === 'preparation'
    ? 'preparation'
    : currentPeriod.type === 'kinhin'
      ? 'kinhin'
      : 'zazen';

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.lg }] }>
      <Text style={styles.title}>{t('app.title')}</Text>
      <SessionImage periodType={periodMode} />
      <Text style={styles.period}>{periodLabel}</Text>
      <Text style={styles.timer}>{`${timeDisplay.value} ${unitLabel}`}</Text>
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
  period: {
    ...typography.heading,
    color: colors.textSecondary,
    marginTop: spacing.xl
  },
  timer: {
    ...typography.timerLarge,
    color: colors.textPrimary,
    marginTop: spacing.lg
  }
});
 
