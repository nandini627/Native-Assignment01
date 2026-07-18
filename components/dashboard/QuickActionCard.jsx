// ============================================================
// components/dashboard/QuickActionCard.jsx
// Reusable quick-action tile used in the 2×2 grid
// Props:
//   title   — label under the icon
//   icon    — emoji string
//   color   — background colour for the card
//   onPress — navigation callback
// ============================================================

import React, { useState } from 'react';
import { Pressable, Text, StyleSheet, Animated, View } from 'react-native';
import {
    Colors,
    FontSize,
    FontWeight,
    Spacing,
    BorderRadius,
    Shadows,
} from '../../constants/theme';

export default function QuickActionCard({ title, icon, color = Colors.primary, onPress }) {
    // Simple press scale effect using state + inline transform hack
    const [pressed, setPressed] = useState(false);

    return (
        <Pressable
            style={[
                styles.card,
                { backgroundColor: color },
                pressed && styles.cardPressed,
            ]}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            onPress={onPress}
        >
            {/* Decorative background circle */}
            <View style={styles.circle} />

            {/* Emoji icon */}
            <Text style={styles.icon}>{icon}</Text>

            {/* Label */}
            <Text style={styles.title}>{title}</Text>

            {/* Small arrow indicator */}
            <Text style={styles.arrow}>›</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '48%',
        borderRadius: BorderRadius.lg,
        padding: Spacing.xl,
        marginBottom: Spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        minHeight: 110,
        ...Shadows.md,
    },
    cardPressed: {
        opacity: 0.85,
        transform: [{ scale: 0.97 }],
    },
    circle: {
        position: 'absolute',
        bottom: -20,
        right: -20,
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    icon: {
        fontSize: 34,
        marginBottom: Spacing.sm,
    },
    title: {
        color: Colors.textWhite,
        fontSize: FontSize.md,
        fontWeight: FontWeight.semiBold,
        textAlign: 'center',
    },
    arrow: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: FontSize.xl,
        position: 'absolute',
        top: Spacing.sm,
        right: Spacing.md,
    },
});
