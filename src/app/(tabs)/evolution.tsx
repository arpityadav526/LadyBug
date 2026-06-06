import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Typography } from '../../components/Typography';
import { Card } from '../../components/Card';
import { theme } from '../../theme/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EvolutionCenterScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerProfile}>
            <View style={styles.avatarPlaceholder}>
              <MaterialIcons name="person" size={24} color={theme.colors.onPrimaryContainer} />
            </View>
            <Typography variant="headlineMd">Evolution Center</Typography>
          </View>
          <MaterialIcons name="local-fire-department" size={28} color={theme.colors.primary} />
        </View>

        {/* Mascot / Level Card */}
        <Card style={styles.mascotCard}>
          <View style={styles.mascotImagePlaceholder}>
            <MaterialIcons name="pest-control" size={80} color={theme.colors.primary} />
          </View>
          <View style={styles.levelBadge}>
            <MaterialIcons name="star" size={14} color={theme.colors.onPrimary} style={{ marginRight: 4 }} />
            <Typography variant="labelSm" color={theme.colors.onPrimary}>LEVEL 12</Typography>
          </View>
          <Typography variant="headlineLg" style={{ marginTop: 12 }}>Scholar Bug</Typography>
          <Typography variant="bodySm" color={theme.colors.onSurfaceVariant} align="center" style={{ marginTop: 4 }}>
            Keep studying to evolve into a "Dean's List Beetle"
          </Typography>

          <View style={styles.xpSection}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <Typography variant="labelSm" color={theme.colors.onSurfaceVariant}>XP PROGRESS</Typography>
              <Typography variant="labelSm">2,450 / 3,000 XP</Typography>
            </View>
            <View style={styles.xpBarBg}>
              <View style={[styles.xpBarFill, { width: '80%' }]} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12, alignSelf: 'center' }}>
              <MaterialIcons name="trending-up" size={16} color={theme.colors.primary} />
              <Typography variant="labelSm" color={theme.colors.onSurfaceVariant} style={{ marginLeft: 4 }}>
                Only <Typography variant="labelSm" color={theme.colors.onSurface}>550 XP</Typography> more to Level 13!
              </Typography>
            </View>
          </View>
        </Card>

        {/* Achievement Badges */}
        <View style={styles.sectionHeader}>
          <Typography variant="labelLg">Achievement Badges</Typography>
          <Typography variant="labelMd" color={theme.colors.primary}>View All</Typography>
        </View>

        <View style={styles.badgesRow}>
          <Card style={styles.badgeCard}>
            <View style={[styles.badgeIconBg, { backgroundColor: 'rgba(251, 192, 45, 0.15)' }]}>
              <MaterialIcons name="emoji-events" size={32} color={theme.colors.achievementGold} />
            </View>
            <Typography variant="labelSm" color={theme.colors.achievementGold} style={{ marginTop: 8 }}>GOLD TIER</Typography>
            <Typography variant="labelMd">7 Day Streak</Typography>
          </Card>
          
          <Card style={styles.badgeCard}>
            <View style={[styles.badgeIconBg, { backgroundColor: 'rgba(21, 101, 192, 0.15)' }]}>
              <Ionicons name="book" size={28} color={theme.colors.productivityBlue} />
            </View>
            <Typography variant="labelSm" color={theme.colors.productivityBlue} style={{ marginTop: 8 }}>BLUE TIER</Typography>
            <Typography variant="labelMd">Study Master</Typography>
          </Card>
        </View>

        {/* Streak Rewards */}
        <Typography variant="labelLg" style={{ marginTop: 24, marginBottom: 12 }}>Streak Rewards</Typography>
        
        <View style={styles.streakCard}>
          <View style={styles.streakInner}>
            <View style={styles.streakIconContainer}>
              <MaterialIcons name="local-fire-department" size={28} color={theme.colors.onPrimary} />
            </View>
            <View style={{ flex: 1, marginHorizontal: 12 }}>
              <Typography variant="labelLg" color={theme.colors.onPrimary}>Streak: 12 Days</Typography>
              <Typography variant="bodySm" color={theme.colors.onPrimary} style={{ opacity: 0.9 }}>
                3 more days to unlock the "Super Sparkle" shell!
              </Typography>
            </View>
            <View style={styles.streakBadge}>
              <Typography variant="labelLg" color={theme.colors.primary}>12</Typography>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.containerMargin,
    paddingBottom: theme.spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  headerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primaryContainer,
    marginRight: theme.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mascotCard: {
    alignItems: 'center',
    padding: theme.spacing.xl,
    paddingTop: 40,
    marginBottom: theme.spacing.xl,
  },
  mascotImagePlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#fff',
    ...theme.shadows.level2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -16,
    zIndex: 1,
  },
  levelBadge: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    zIndex: 2,
  },
  xpSection: {
    width: '100%',
    marginTop: 32,
    borderTopWidth: 1,
    borderTopColor: theme.colors.surfaceContainerHigh,
    paddingTop: 24,
  },
  xpBarBg: {
    height: 8,
    backgroundColor: theme.colors.surfaceContainerHigh,
    borderRadius: 4,
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  badgeCard: {
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  badgeIconBg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  streakCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.rounded.xl,
    padding: theme.spacing.md,
    ...theme.shadows.level2,
  },
  streakInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  streakBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
