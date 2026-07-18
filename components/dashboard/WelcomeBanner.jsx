// ============================================================
// components/dashboard/WelcomeBanner.jsx
// Big hero banner at the top of the Dashboard
// Shows greeting + app name + tagline
// ============================================================

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadows } from '../../constants/theme';

export default function WelcomeBanner() {
    // Get current hour to display a dynamic greeting
    const hour = new Date().getHours();
    const greeting =
        hour < 12 ? '🌅 Good Morning' :
            hour < 17 ? '☀️ Good Afternoon' :
                '🌙 Good Evening';

    return (
        <View style={styles.card}>
            {/* Top decorative dots for visual interest */}
            <View style={styles.decorCircle} />
            <View style={styles.decorCircle2} />

            {/* Greeting text */}
            <Text style={styles.greeting}>{greeting}</Text>

            {/* App name */}
            <Text style={styles.appName}>Smart Field Survey</Text>

            {/* Tagline */}
            <Text style={styles.tagline}>Inspection & Survey Management App</Text>

            {/* Bottom badge */}
            <View style={styles.badge}>
                <Text style={styles.badgeText}>📱 Expo SDK 54  ·  React Native</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.primary,
        borderRadius: BorderRadius.xl,
        padding: Spacing.xxl,
        marginBottom: Spacing.xl,
        overflow: 'hidden',          // keeps decorative circles clipped
        ...Shadows.lg,
    },

    // Decorative background circles (pure CSS art)
    decorCircle: {
        position: 'absolute',
        top: -30,
        right: -30,
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255,255,255,0.08)',
    },
    decorCircle2: {
        position: 'absolute',
        bottom: -40,
        right: 50,
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: 'rgba(255,255,255,0.05)',
    },

    greeting: {
        fontSize: FontSize.md,
        color: Colors.primaryLight,
        marginBottom: Spacing.xs,
        fontWeight: FontWeight.medium,
    },
    appName: {
        fontSize: FontSize.xxxl,
        fontWeight: FontWeight.extraBold,
        color: Colors.textWhite,
        letterSpacing: 0.5,
        marginBottom: Spacing.xs,
    },
    tagline: {
        fontSize: FontSize.sm,
        color: 'rgba(255,255,255,0.75)',
        marginBottom: Spacing.lg,
    },
    badge: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0.15)',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.full,
    },
    badgeText: {
        fontSize: FontSize.xs,
        color: Colors.textWhite,
        fontWeight: FontWeight.medium,
    },
});
