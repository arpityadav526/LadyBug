import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

type TypographyVariant = keyof typeof theme.typography;

interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export function Typography({
  variant = 'bodyMd',
  color = theme.colors.onSurface,
  align = 'left',
  style,
  children,
  ...props
}: TypographyProps) {
  const variantStyle = theme.typography[variant];

  return (
    <Text
      style={[
        variantStyle,
        { color, textAlign: align },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}
