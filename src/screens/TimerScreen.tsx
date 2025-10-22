import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@navigation/types';
import { useTranslation } from 'react-i18next';
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
  const sessionType = route.params?.sessionType as 'zazen' | 'complete';
  const { currentPeriod, timeDisplay, stop } = useTimer(sessionType);

  useEffect(() => {
    const unsub = navigation.addListener('beforeRemove', () => {
      stop();
    });
    return unsub;
  }, [navigation, stop]);

  const periodLabel = t(`periods.${currentPeriod.type}`);
  const unitLabel = t(timeDisplay.unitKey);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('app.title')}</Text>
      <SessionImage periodType={currentPeriod.type === 'kinhin' ? 'kinhin' : 'zazen'} />
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
    paddingTop: spacing['2xl'],
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
 
