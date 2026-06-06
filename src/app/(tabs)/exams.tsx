import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Typography } from '../../components/Typography';
import { Card } from '../../components/Card';
import { theme } from '../../theme/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';

export default function ExamsDashboardScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerProfile}>
            <View style={styles.avatarPlaceholder}>
              <MaterialIcons name="person" size={24} color={theme.colors.onPrimaryContainer} />
            </View>
            <Typography variant="headlineMd">Hi, Student!</Typography>
          </View>
          <MaterialIcons name="notifications-none" size={28} color={theme.colors.primary} />
        </View>

        {/* Critical Deadline Card */}
        <View style={[styles.highlightCard, styles.criticalCard]}>
          <Typography variant="labelSm" color={theme.colors.onPrimaryContainer} style={{ letterSpacing: 1 }}>
            CRITICAL DEADLINE
          </Typography>
          <Typography variant="headlineMd" color={theme.colors.onPrimaryContainer} style={{ marginTop: 4 }}>
            DBMS Exam
          </Typography>
          <View style={styles.daysRow}>
            <Typography variant="display" color={theme.colors.onPrimaryContainer}>05</Typography>
            <Typography variant="labelMd" color={theme.colors.onPrimaryContainer} style={{ marginLeft: 8 }}>
              Days Remaining
            </Typography>
          </View>
          <View style={styles.dateChip}>
            <MaterialIcons name="event" size={14} color={theme.colors.onPrimaryContainer} />
            <Typography variant="labelSm" color={theme.colors.onPrimaryContainer} style={{ marginLeft: 4 }}>
              Oct 24, 2023 • 09:30 AM
            </Typography>
          </View>
        </View>

        {/* Upcoming Challenge Card */}
        <View style={[styles.highlightCard, styles.upcomingCard]}>
          <Typography variant="labelSm" color={theme.colors.onTertiaryContainer} style={{ letterSpacing: 1 }}>
            UPCOMING CHALLENGE
          </Typography>
          <Typography variant="headlineMd" color={theme.colors.onTertiaryContainer} style={{ marginTop: 4 }}>
            Operating Systems
          </Typography>
          <View style={styles.daysRow}>
            <Typography variant="display" color={theme.colors.onTertiaryContainer}>12</Typography>
            <Typography variant="labelMd" color={theme.colors.onTertiaryContainer} style={{ marginLeft: 8 }}>
              Days Remaining
            </Typography>
          </View>
          <View style={[styles.dateChip, { backgroundColor: 'rgba(0,0,0,0.1)' }]}>
            <MaterialIcons name="event" size={14} color={theme.colors.onTertiaryContainer} />
            <Typography variant="labelSm" color={theme.colors.onTertiaryContainer} style={{ marginLeft: 4 }}>
              Nov 02, 2023 • 02:00 PM
            </Typography>
          </View>
          <MaterialIcons name="schedule" size={100} color="rgba(255,255,255,0.1)" style={styles.bgIcon} />
        </View>

        {/* Full Exam Schedule */}
        <View style={styles.sectionHeader}>
          <Typography variant="labelLg">Full Exam Schedule</Typography>
          <Typography variant="labelMd" color={theme.colors.primary}>View Calendar</Typography>
        </View>

        <Card style={styles.scheduleCard}>
          <View style={styles.scheduleItem}>
            <View style={[styles.iconBox, { backgroundColor: theme.colors.primaryContainer }]}>
              <MaterialIcons name="storage" size={24} color={theme.colors.primary} />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="labelLg">DBMS Exam</Typography>
                <View style={styles.urgentBadge}>
                  <Typography variant="labelSm" color={theme.colors.onError}>Urgent</Typography>
                </View>
              </View>
              <Typography variant="bodySm" color={theme.colors.onSurfaceVariant} style={{ marginTop: 2 }}>
                Database Management Systems • Unit 4 & 5 Focus
              </Typography>
              <View style={{ flexDirection: 'row', marginTop: 8, alignItems: 'center' }}>
                <MaterialIcons name="event" size={14} color={theme.colors.onSurfaceVariant} />
                <Typography variant="labelSm" color={theme.colors.onSurfaceVariant} style={{ marginLeft: 4 }}>
                  Oct 24
                </Typography>
                <MaterialIcons name="timer" size={14} color={theme.colors.primary} style={{ marginLeft: 12 }} />
                <Typography variant="labelSm" color={theme.colors.primary} style={{ marginLeft: 4 }}>
                  5 Days left
                </Typography>
              </View>
            </View>
          </View>
          
          <View style={styles.divider} />

          <View style={styles.scheduleItem}>
            <View style={[styles.iconBox, { backgroundColor: theme.colors.tertiaryContainer }]}>
              <MaterialIcons name="memory" size={24} color={theme.colors.onTertiaryContainer} />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="labelLg">Operating Systems</Typography>
                <View style={[styles.urgentBadge, { backgroundColor: theme.colors.tertiary }]}>
                  <Typography variant="labelSm" color={theme.colors.onTertiary}>Upcoming</Typography>
                </View>
              </View>
              <Typography variant="bodySm" color={theme.colors.onSurfaceVariant} style={{ marginTop: 2 }}>
                Process Scheduling & Memory Mgmt
              </Typography>
              <View style={{ flexDirection: 'row', marginTop: 8, alignItems: 'center' }}>
                <MaterialIcons name="event" size={14} color={theme.colors.onSurfaceVariant} />
                <Typography variant="labelSm" color={theme.colors.onSurfaceVariant} style={{ marginLeft: 4 }}>
                  Nov 02
                </Typography>
                <MaterialIcons name="timer" size={14} color={theme.colors.tertiary} style={{ marginLeft: 12 }} />
                <Typography variant="labelSm" color={theme.colors.tertiary} style={{ marginLeft: 4 }}>
                  12 Days left
                </Typography>
              </View>
            </View>
          </View>
        </Card>

        {/* Study Progress */}
        <Card style={styles.progressCardSection}>
          <Typography variant="labelLg" style={{ marginBottom: 16 }}>Study Progress</Typography>
          
          <View style={{ marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
              <Typography variant="labelMd">DBMS Mastery</Typography>
              <Typography variant="labelMd" color={theme.colors.primary}>65%</Typography>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '65%', backgroundColor: theme.colors.primary }]} />
            </View>
          </View>

          <View style={{ marginBottom: 24 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
              <Typography variant="labelMd">OS Foundations</Typography>
              <Typography variant="labelMd" color={theme.colors.tertiary}>40%</Typography>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '40%', backgroundColor: theme.colors.tertiary }]} />
            </View>
          </View>

          <Button title="Start Study Session" onPress={() => {}} />
        </Card>

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
  highlightCard: {
    borderRadius: theme.rounded.xl,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    position: 'relative',
  },
  criticalCard: {
    backgroundColor: theme.colors.primary,
  },
  upcomingCard: {
    backgroundColor: theme.colors.tertiaryContainer,
  },
  daysRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 8,
  },
  dateChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  bgIcon: {
    position: 'absolute',
    right: -20,
    bottom: -20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  scheduleCard: {
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  scheduleItem: {
    flexDirection: 'row',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  urgentBadge: {
    backgroundColor: theme.colors.error,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.outlineVariant,
    marginVertical: 16,
    opacity: 0.5,
  },
  progressCardSection: {
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: theme.colors.surfaceContainerHigh,
    borderRadius: 3,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
});
