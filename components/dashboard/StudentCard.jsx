// ============================================================
// components/dashboard/StudentCard.jsx
// Displays student/developer info in a styled info card
// Props: none (data imported from constants)
// ============================================================

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { STUDENT } from '../../data/studentData';
import {
    Colors,
    FontSize,
    FontWeight,
    Spacing,
    BorderRadius,
    Shadows,
} from '../../constants/theme';

export default function StudentCard() {
    return (
        <View style={styles.card}>
            {/* Card header row */}
            <View style={styles.header}>
                <View style={styles.iconWrap}>
                    <Ionicons name="person" size={18} color={Colors.primary} />
                </View>
                <Text style={styles.cardTitle}>Student Details</Text>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Info rows */}
            <InfoRow icon="person-outline" label="Name" value={STUDENT.name} />
            <InfoRow icon="id-card-outline" label="Enrollment" value={STUDENT.enrollment} />
            <InfoRow icon="school-outline" label="Course" value={STUDENT.course} />
            <InfoRow icon="business-outline" label="College" value={STUDENT.college} />
            <InfoRow icon="code-slash-outline" label="Subject" value={STUDENT.subject} />
        </View>
    );
}

// ── Reusable inner row component ──────────────────────────────
function InfoRow({ icon, label, value }) {
    return (
        <View style={styles.row}>
            <Ionicons name={icon} size={15} color={Colors.textSecondary} style={styles.rowIcon} />
            <Text style={styles.label}>{label}: </Text>
            <Text style={styles.value} numberOfLines={1}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.xl,
        marginBottom: Spacing.xl,
        borderLeftWidth: 4,
        borderLeftColor: Colors.primary,
        ...Shadows.md,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    iconWrap: {
        backgroundColor: Colors.primaryLight,
        padding: Spacing.xs,
        borderRadius: BorderRadius.sm,
        marginRight: Spacing.sm,
    },
    cardTitle: {
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
        color: Colors.textPrimary,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.divider,
        marginBottom: Spacing.md,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    rowIcon: {
        marginRight: Spacing.xs,
        width: 18,
    },
    label: {
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
        fontWeight: FontWeight.semiBold,
        minWidth: 80,
    },
    value: {
        fontSize: FontSize.sm,
        color: Colors.textPrimary,
        flex: 1,
    },
});
