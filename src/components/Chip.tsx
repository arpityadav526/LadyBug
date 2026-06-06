import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Typography } from './Typography';
import { theme } from '../theme/theme';

interface ChipProps {
  label: string;
  color?: string; // Base color
  style?: StyleProp<ViewStyle>;
}

export function Chip({ label, color = theme.colors.tertiary, style }: ChipProps) {
  return (
    <View
      style={[
        styles.chip,
        { backgroundColor: `${color}1A` }, // 10% opacity hex extension (approximate for #...1A)
        style,
      ]}
    >
      <Typography variant="labelMd" color={color}>
        {label}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.rounded.full,
    alignSelf: 'flex-start',
  },
});
