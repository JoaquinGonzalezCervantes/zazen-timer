import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@navigation/types';
import { useTranslation } from 'react-i18next';
import Button from '@components/Button';
import SessionImage from '@components/SessionImage';
import colors from '@theme/colors';
import { spacing } from '@theme/spacing';
import { typography } from '@theme/typography';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Landing'>;

export default function LandingScreen() {
  const navigation = useNavigation<Nav>();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('app.title')}</Text>

      <View style={styles.actions}>
        <Button
          title={t('buttons.zazen')}
          onPress={() => navigation.navigate('SessionSummary', { sessionType: 'zazen' })}
          variant="secondary"
          left={<SessionImage sessionType="zazen" />}
          style={styles.button}
        />
        <Button
          title={t('buttons.completeZazen')}
          onPress={() => navigation.navigate('SessionSummary', { sessionType: 'complete' })}
          left={<SessionImage sessionType="complete" />}
          style={styles.button}
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
    paddingTop: spacing['2xl'],
    paddingHorizontal: spacing.xl
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
    marginBottom: spacing['2xl']
  },
  actions: {
    width: '100%',
    gap: spacing.lg,
  },
  button: {
    width: '100%'
  }
});
