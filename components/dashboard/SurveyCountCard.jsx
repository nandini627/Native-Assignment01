// ============================================================
// components/dashboard/SurveyCountCard.jsx
// Shows today's survey count with a colourful gradient-like card
// Props:
//   count — number of surveys today (default: 0)
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

export default function SurveyCountCard({ count = 0 }) {
    return (
        <View style={styles.card}>
            {/* Left: big count number */}
            <View style={styles.left}>
                <Text style={styles.count}>{count}</Text>
                <Text style={styles.label}>Today's Surveys</Text>
            </View>

            {/* Right: icon + mini status indicator */}
            <View style={styles.right}>
                <View style={styles.iconCircle}>
                    <Ionicons name="clipboard" size={32} color={Colors.textWhite} />
                </View>
                <View style={styles.statusRow}>
                    <View style={styles.dot} />
                    <Text style={styles.statusText}>Active</Text>
                </View>
            </View>

            {/* Decorative background shape */}
            <View style={styles.decor} />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.success,
        borderRadius: BorderRadius.xl,
        padding: Spacing.xl,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.xl,
        overflow: 'hidden',
        ...Shadows.md,
    },
    left: {
        flex: 1,
    },
    count: {
        fontSize: FontSize.display,       // big number
        fontWeight: FontWeight.extraBold,
        color: Colors.textWhite,
        lineHeight: 44,
    },
    label: {
        fontSize: FontSize.md,
        color: 'rgba(255,255,255,0.85)',
        fontWeight: FontWeight.medium,
        marginTop: Spacing.xs,
    },
    right: {
        alignItems: 'center',
        gap: Spacing.sm,
    },
    iconCircle: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: BorderRadius.full,
        padding: Spacing.md,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#86EFAC',    // lighter green dot
    },
    statusText: {
        fontSize: FontSize.xs,
        color: Colors.textWhite,
        fontWeight: FontWeight.semiBold,
    },
    decor: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.07)',
        top: -20,
        right: -20,
    },
});
