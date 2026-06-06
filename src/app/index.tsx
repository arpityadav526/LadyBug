import React from 'react';
import { View, StyleSheet, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { GlassContainer } from '../components/GlassContainer';
import { theme } from '../theme/theme';
import { StatusBar } from 'expo-status-bar';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Typography variant="display" color={theme.colors.primary} align="center">
            LadyBug
          </Typography>
        </View>

        <View style={styles.imageContainer}>
          {/* Background Decorative Element */}
          <View style={styles.circleDecoration} />
          
          <GlassContainer style={styles.glassCard}>
            <Image 
              source={require('../../stitch_assets/welcome_to_ladybug.png')} 
              style={styles.image}
              resizeMode="cover"
            />
          </GlassContainer>
        </View>

        <View style={styles.textContainer}>
          <Typography variant="headlineMd" align="center" style={styles.title}>
            Nurture Your Growth
          </Typography>
          <Typography variant="bodyMd" color={theme.colors.onSurfaceVariant} align="center" style={styles.subtitle}>
            Your premium academic companion. Grow smarter, stay composed, and achieve your milestones.
          </Typography>
        </View>

        <View style={styles.footer}>
          <Button 
            title="Get Started" 
            onPress={() => router.replace('/(tabs)')} 
            style={styles.button} 
          />
          <Button 
            title="I already have an account" 
            variant="tertiary"
            onPress={() => router.replace('/(tabs)')} 
            style={styles.buttonSecondary} 
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  content: {
    flex: 1,
    padding: theme.spacing.containerMargin,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    marginTop: theme.spacing.xl,
  },
  imageContainer: {
    width: '100%',
    maxWidth: 320,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: theme.spacing.xl,
    position: 'relative',
  },
  circleDecoration: {
    position: 'absolute',
    width: '110%',
    height: '110%',
    borderRadius: 999,
    backgroundColor: theme.colors.primaryContainer,
    opacity: 0.2,
  },
  glassCard: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.base,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
  },
  textContainer: {
    paddingHorizontal: theme.spacing.md,
  },
  title: {
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    marginBottom: theme.spacing.xl,
  },
  footer: {
    width: '100%',
    paddingBottom: theme.spacing.xl,
  },
  button: {
    marginBottom: theme.spacing.md,
  },
  buttonSecondary: {
    // any extra styles for secondary button
  },
});
