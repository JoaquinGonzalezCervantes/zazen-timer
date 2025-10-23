import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, Pressable, GestureResponderEvent, PressableStateCallbackType } from 'react-native';
import colors from '@theme/colors';
import { spacing } from '@theme/spacing';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}

export default function Card({ children, style, onPress }: CardProps) {
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={(state: PressableStateCallbackType) => [
          styles.card,
          state.pressed && styles.pressed,
          style
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    // Subtle shadow for depth while keeping a zen aesthetic
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 3
  },
  pressed: {
    opacity: 0.95,
    transform: [{ scale: 0.98 }]
  }
});
