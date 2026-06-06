import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, Platform, View } from 'react-native';
import { theme } from '../theme/theme';

interface GlassContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  intensity?: number;
}

export function GlassContainer({ children, style, intensity = 20 }: GlassContainerProps) {
  // Use a simulated glass effect with translucent background
  // Expo's BlurView could also be used here if needed
  return (
    <View
      style={[
        styles.container,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: theme.rounded.lg,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    ...Platform.select({
      ios: {
        // iOS blur simulation could be added here if expo-blur was installed
      },
    }),
  },
});
