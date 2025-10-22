import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import colors from '@theme/colors';

type Props =
  | { periodType: 'preparation' | 'zazen' | 'kinhin'; sessionType?: never }
  | { sessionType: 'zazen' | 'complete'; periodType?: never };

export default function SessionImage(props: Props) {
  const mode = 'periodType' in props ? props.periodType : props.sessionType === 'complete' ? 'kinhin' : 'zazen';
  const isKinhin = mode === 'kinhin';
  let source: any = null;
  try {
    source = isKinhin
      ? require('../../assets/images/zazen_kinhin.png')
      : require('../../assets/images/zazen.png');
  } catch (e) {
    // fallback to styled placeholder if assets are missing
    source = null;
  }

  if (!source) {
    return <View style={[styles.circle, { backgroundColor: isKinhin ? colors.primaryMuted : colors.primary }]} />;
  }

  return <Image source={source} style={styles.image} resizeMode="contain" />;
}

const styles = StyleSheet.create({
  circle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 12
  }
});
