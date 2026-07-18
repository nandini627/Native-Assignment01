// ============================================================
// components/dashboard/RecentSurveyList.jsx
// Shows up to 3 most recent surveys in card form
// Props:
//   surveys — array of survey objects from data/studentData.js
// ============================================================

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
    Colors,
    FontSize,
    FontWeight,
    Spacing,
    BorderRadius,
    Shadows,
} from '../../constants/theme';

// ── Priority badge ─────────────────────────────────────────
function PriorityBadge({ priority }) {
    const config = {
        High: { bg: Colors.priorityHighBg, text: Colors.priorityHigh, icon: '🔴' },
        Medium: { bg: Colors.priorityMediumBg, text: Colors.priorityMedium, icon: '🟡' },
        Low: { bg: Colors.priorityLowBg, text: Colors.priorityLow, icon: '🟢' },
    };
    const c = config[priority] || config.Low;

    return (
        <View style={[styles.badge, { backgroundColor: c.bg }]}>
            <Text style={[styles.badgeText, { color: c.text }]}>
                {c.icon} {priority}
            </Text>
        </View>
    );
}

// ── Status chip ────────────────────────────────────────────
function StatusChip({ status }) {
    const isComplete = status === 'Completed';
    return (
        <View style={[styles.chip, isComplete ? styles.chipComplete : styles.chipPending]}>
            <Ionicons
                name={isComplete ? 'checkmark-circle' : 'time-outline'}
                size={12}
                color={isComplete ? Colors.success : Colors.warning}
            />
            <Text style={[styles.chipText, { color: isComplete ? Colors.success : Colors.warning }]}>
                {' '}{status}
            </Text>
        </View>
    );
}

// ── Main component ─────────────────────────────────────────
export default function RecentSurveyList({ surveys = [] }) {
    return (
        <View style={styles.section}>
            {/* Section header */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>📋  Recent Surveys</Text>
                <Text style={styles.seeAll}>See all ›</Text>
            </View>

            {/* Survey cards */}
            {surveys.map((item) => (
                <View key={item.id} style={styles.card}>
                    {/* Row 1: site name + status */}
                    <View style={styles.row}>
                        <Text style={styles.siteName} numberOfLines={1}>{item.siteName}</Text>
                        <StatusChip status={item.status} />
                    </View>

                    {/* Row 2: client name */}
                    <View style={styles.infoRow}>
                        <Ionicons name="person-outline" size={13} color={Colors.textMuted} />
                        <Text style={styles.infoText}>{item.clientName}</Text>
                    </View>

                    {/* Row 3: date + priority badge */}
                    <View style={styles.footer}>
                        <View style={styles.infoRow}>
                            <Ionicons name="calendar-outline" size={13} color={Colors.textMuted} />
                            <Text style={styles.infoText}>{item.date}</Text>
                        </View>
                        <PriorityBadge priority={item.priority} />
                    </View>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        marginBottom: Spacing.xl,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    sectionTitle: {
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
        color: Colors.textPrimary,
    },
    seeAll: {
        fontSize: FontSize.sm,
        color: Colors.primary,
        fontWeight: FontWeight.semiBold,
    },
    card: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.md,
        padding: Spacing.lg,
        marginBottom: Spacing.md,
        ...Shadows.sm,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    siteName: {
        fontSize: FontSize.md,
        fontWeight: FontWeight.bold,
        color: Colors.textPrimary,
        flex: 1,
        marginRight: Spacing.sm,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.xs,
        gap: Spacing.xs,
    },
    infoText: {
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Spacing.xs,
    },

    // Priority badge
    badge: {
        paddingHorizontal: Spacing.sm,
        paddingVertical: 3,
        borderRadius: BorderRadius.full,
    },
    badgeText: {
        fontSize: FontSize.xs,
        fontWeight: FontWeight.semiBold,
    },

    // Status chip
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.sm,
        paddingVertical: 3,
        borderRadius: BorderRadius.full,
    },
    chipComplete: {
        backgroundColor: Colors.successLight,
    },
    chipPending: {
        backgroundColor: Colors.warningLight,
    },
    chipText: {
        fontSize: FontSize.xs,
        fontWeight: FontWeight.semiBold,
    },
});
