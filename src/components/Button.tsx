import React from 'react';
import { Pressable, Text, View, StyleSheet, GestureResponderEvent, ViewStyle, PressableStateCallbackType } from 'react-native';
import colors from '@theme/colors';
import { spacing } from '@theme/spacing';

type Variant = 'primary' | 'secondary';

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: Variant;
  style?: ViewStyle;
  left?: React.ReactNode;
}

export default function Button({ title, onPress, variant = 'primary', style, left }: ButtonProps) {
  return (
    <Pressable onPress={onPress} style={(state: PressableStateCallbackType) => [
      styles.base,
      variant === 'primary' ? styles.primary : styles.secondary,
      state.pressed && styles.pressed,
      style
    ]}>
      <View style={styles.content}>
        {left && <View style={styles.left}>{left}</View>}
        <Text style={[styles.text, variant === 'secondary' && styles.textSecondary]}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 14,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 4,
    marginVertical: spacing.md,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }]
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  left: {
    marginRight: spacing.md
  },
  text: {
    color: '#0B1220',
    fontSize: 18,
    fontWeight: '700'
  },
  textSecondary: {
    color: '#E5E7EB'
  }
});
