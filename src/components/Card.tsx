import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import colors from '@theme/colors';
import { spacing } from '@theme/spacing';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border
  }
});
