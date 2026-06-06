export const theme = {
  colors: {
    surface: '#fbf8ff',
    surfaceDim: '#d7d8f4',
    surfaceBright: '#fbf8ff',
    surfaceContainerLowest: '#ffffff',
    surfaceContainerLow: '#f4f2ff',
    surfaceContainer: '#edecff',
    surfaceContainerHigh: '#e6e6ff',
    surfaceContainerHighest: '#e0e0fc',
    onSurface: '#181a2e',
    onSurfaceVariant: '#5b403f',
    inverseSurface: '#2d2f44',
    inverseOnSurface: '#f1efff',
    outline: '#8f6f6e',
    outlineVariant: '#e4bebc',
    surfaceTint: '#bb152c',
    primary: '#b7102a',
    onPrimary: '#ffffff',
    primaryContainer: '#db313f',
    onPrimaryContainer: '#fffbff',
    inversePrimary: '#ffb3b1',
    secondary: '#665e49',
    onSecondary: '#ffffff',
    secondaryContainer: '#ebdfc4',
    onSecondaryContainer: '#6b624d',
    tertiary: '#286182',
    onTertiary: '#ffffff',
    tertiaryContainer: '#447a9c',
    onTertiaryContainer: '#fcfcff',
    error: '#ba1a1a',
    onError: '#ffffff',
    errorContainer: '#ffdad6',
    onErrorContainer: '#93000a',
    primaryFixed: '#ffdad8',
    primaryFixedDim: '#ffb3b1',
    onPrimaryFixed: '#410007',
    onPrimaryFixedVariant: '#92001c',
    secondaryFixed: '#eee1c7',
    secondaryFixedDim: '#d1c5ac',
    onSecondaryFixed: '#211b0b',
    onSecondaryFixedVariant: '#4e4633',
    tertiaryFixed: '#c7e7ff',
    tertiaryFixedDim: '#98cdf2',
    onTertiaryFixed: '#001e2e',
    onTertiaryFixedVariant: '#064c6b',
    background: '#fbf8ff',
    onBackground: '#181a2e',
    surfaceVariant: '#e0e0fc',
    // Custom functional colors matching "Nurtured Growth"
    successGreen: '#2e7d32', // Added based on design notes
    productivityBlue: '#1565c0', // Added based on design notes
    achievementGold: '#fbc02d', // Added based on design notes
  },
  typography: {
    display: {
      fontFamily: 'PlusJakartaSans_800ExtraBold',
      fontSize: 40,
      lineHeight: 44, // 1.1 * 40
      letterSpacing: -0.8, // -0.02em * 40
    },
    headlineLg: {
      fontFamily: 'PlusJakartaSans_700Bold',
      fontSize: 32,
      lineHeight: 38.4, // 1.2 * 32
      letterSpacing: -0.32, // -0.01em * 32
    },
    headlineLgMobile: {
      fontFamily: 'PlusJakartaSans_700Bold',
      fontSize: 28,
      lineHeight: 33.6, // 1.2 * 28
    },
    headlineMd: {
      fontFamily: 'PlusJakartaSans_700Bold',
      fontSize: 24,
      lineHeight: 31.2, // 1.3 * 24
    },
    headlineSm: {
      fontFamily: 'PlusJakartaSans_600SemiBold',
      fontSize: 20,
      lineHeight: 28, // 1.4 * 20
    },
    bodyLg: {
      fontFamily: 'PlusJakartaSans_400Regular',
      fontSize: 18,
      lineHeight: 28.8, // 1.6 * 18
    },
    bodyMd: {
      fontFamily: 'PlusJakartaSans_400Regular',
      fontSize: 16,
      lineHeight: 25.6, // 1.6 * 16
    },
    bodySm: {
      fontFamily: 'PlusJakartaSans_400Regular',
      fontSize: 14,
      lineHeight: 21, // 1.5 * 14
    },
    labelLg: {
      fontFamily: 'PlusJakartaSans_600SemiBold',
      fontSize: 14,
      lineHeight: 16.8, // 1.2 * 14
      letterSpacing: 0.28, // 0.02em * 14
    },
    labelMd: {
      fontFamily: 'PlusJakartaSans_600SemiBold',
      fontSize: 12,
      lineHeight: 14.4, // 1.2 * 12
      letterSpacing: 0.48, // 0.04em * 12
    },
    labelSm: {
      fontFamily: 'PlusJakartaSans_700Bold',
      fontSize: 10,
      lineHeight: 12, // 1.2 * 10
      letterSpacing: 0.5, // 0.05em * 10
    },
  },
  rounded: {
    sm: 4, // 0.25rem
    default: 8, // 0.5rem
    md: 12, // 0.75rem
    lg: 16, // 1rem
    xl: 24, // 1.5rem
    full: 9999,
  },
  spacing: {
    xs: 4,
    base: 8,
    sm: 12,
    md: 16,
    containerMargin: 20,
    gutter: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  shadows: {
    level1: {
      shadowColor: '#181a2e',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.04,
      shadowRadius: 8,
      elevation: 2,
    },
    level2: {
      shadowColor: '#181a2e',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
      elevation: 4,
    },
  },
};

export type Theme = typeof theme;
