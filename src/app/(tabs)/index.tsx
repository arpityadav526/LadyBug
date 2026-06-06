import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Typography } from '../../components/Typography';
import { Card } from '../../components/Card';
import { theme } from '../../theme/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeDashboardScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerProfile}>
            <View style={styles.avatarPlaceholder} />
            <View>
              <Typography variant="headlineMd">Good Morning, Arpit</Typography>
              <View style={styles.streakRow}>
                <MaterialIcons name="local-fire-department" size={18} color={theme.colors.primary} />
                <Typography variant="labelMd" color={theme.colors.onSurfaceVariant} style={styles.streakText}>
                  15-day streak!
                </Typography>
              </View>
            </View>
          </View>
          <MaterialIcons name="notifications-none" size={28} color={theme.colors.primary} />
        </View>

        {/* Today's Progress */}
        <Card style={styles.progressCard}>
          <View style={styles.progressTextSection}>
            <Typography variant="headlineSm">Today's Progress</Typography>
            <Typography variant="bodySm" color={theme.colors.onSurfaceVariant} style={styles.progressSub}>
              You're doing great! 4 more tasks to go.
            </Typography>
            <View style={styles.dailyGoalChip}>
              <Typography variant="labelMd" color={theme.colors.primary}>Daily Goal: 8h</Typography>
            </View>
          </View>
          <View style={styles.progressCircle}>
            <View style={styles.progressCircleInner}>
              <Typography variant="headlineSm" color={theme.colors.primary}>68%</Typography>
            </View>
          </View>
        </Card>

        <View style={styles.grid}>
          {/* Tasks Due Today */}
          <Card style={styles.gridItem}>
            <View style={styles.gridHeader}>
              <Typography variant="labelLg">Tasks Due Today</Typography>
            </View>
            <View style={styles.taskItem}>
              <MaterialIcons name="radio-button-unchecked" size={20} color={theme.colors.primary} />
              <Typography variant="bodyMd" style={styles.taskText}>Revise Calculus Ch. 4</Typography>
            </View>
            <View style={styles.taskItem}>
              <MaterialIcons name="radio-button-unchecked" size={20} color={theme.colors.primary} />
              <Typography variant="bodyMd" style={styles.taskText}>Organic Chem Quiz</Typography>
            </View>
            <View style={styles.taskItem}>
              <MaterialIcons name="check-circle" size={20} color={theme.colors.onSurfaceVariant} />
              <Typography variant="bodyMd" color={theme.colors.onSurfaceVariant} style={[styles.taskText, styles.taskDone]}>
                Literature Essay
              </Typography>
            </View>
          </Card>

          {/* Upcoming Exam */}
          <View style={[styles.gridItem, styles.primaryCard]}>
            <MaterialIcons name="event" size={24} color={theme.colors.onPrimaryContainer} />
            <Typography variant="labelLg" color={theme.colors.onPrimaryContainer} style={{ marginTop: 8 }}>
              Upcoming Exam
            </Typography>
            <View style={{ marginTop: 16 }}>
              <Typography variant="headlineMd" color={theme.colors.onPrimaryContainer}>DBMS</Typography>
              <Typography variant="bodySm" color={theme.colors.onPrimaryContainer}>Final Assessment in 5 days</Typography>
            </View>
            <View style={styles.linearProgressBackground}>
              <View style={styles.linearProgressFill} />
            </View>
          </View>
        </View>

        {/* Assignments Pending */}
        <Card style={styles.assignmentsCard}>
          <View style={styles.assignmentsHeader}>
            <Typography variant="labelLg">Assignments Pending</Typography>
            <Typography variant="labelMd" color={theme.colors.primary}>View All</Typography>
          </View>
          
          <View style={styles.assignmentItem}>
            <View style={styles.assignmentIcon}>
              <MaterialIcons name="description" size={24} color={theme.colors.tertiary} />
            </View>
            <View style={{ flex: 1 }}>
              <Typography variant="labelLg">Network Security Lab</Typography>
              <Typography variant="labelSm" color={theme.colors.onSurfaceVariant}>Due: Tomorrow, 11:59 PM</Typography>
            </View>
            <Typography variant="labelMd" color={theme.colors.error}>Priority</Typography>
          </View>

          <View style={styles.assignmentItem}>
            <View style={styles.assignmentIcon}>
              <MaterialIcons name="analytics" size={24} color={theme.colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Typography variant="labelLg">Data Visualization Project</Typography>
              <Typography variant="labelSm" color={theme.colors.onSurfaceVariant}>Due: Friday</Typography>
            </View>
            <Typography variant="labelMd" color={theme.colors.onSurfaceVariant}>Regular</Typography>
          </View>

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
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primaryContainer,
    marginRight: theme.spacing.md,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  streakText: {
    marginLeft: 4,
  },
  progressCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  progressTextSection: {
    flex: 1,
  },
  progressSub: {
    marginTop: 4,
    marginBottom: 12,
  },
  dailyGoalChip: {
    backgroundColor: 'rgba(183, 16, 42, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  progressCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: theme.colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftColor: theme.colors.primary,
    borderTopColor: theme.colors.primary,
    transform: [{ rotate: '45deg' }],
  },
  progressCircleInner: {
    transform: [{ rotate: '-45deg' }],
  },
  grid: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  gridItem: {
    flex: 1,
  },
  gridHeader: {
    marginBottom: theme.spacing.md,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskText: {
    marginLeft: 8,
  },
  taskDone: {
    textDecorationLine: 'line-through',
  },
  primaryCard: {
    backgroundColor: theme.colors.primaryContainer,
    borderRadius: theme.rounded.lg,
    padding: theme.spacing.md,
    justifyContent: 'space-between',
  },
  linearProgressBackground: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    marginTop: 16,
  },
  linearProgressFill: {
    width: '40%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  assignmentsCard: {
    marginBottom: theme.spacing.lg,
  },
  assignmentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  assignmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceContainerLow,
    padding: theme.spacing.sm,
    borderRadius: theme.rounded.md,
    marginBottom: theme.spacing.sm,
  },
  assignmentIcon: {
    marginRight: theme.spacing.md,
  },
});