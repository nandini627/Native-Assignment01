// ============================================================
// components/common/AppHeader.jsx
// Reusable top header used on every screen
// Props:
//   title      — screen title text
//   subtitle   — optional small subtitle below title
//   showBack   — show a back arrow (default false)
//   onBack     — callback when back arrow pressed
// ============================================================

import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, Spacing } from '../../constants/theme';

export default function AppHeader({ title, subtitle, showBack = false, onBack }) {
    return (
        <View style={styles.wrapper}>
            {/* Status bar area */}
            <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

            <View style={styles.container}>
                {/* Left: back button or hamburger placeholder */}
                <View style={styles.left}>
                    {showBack && (
                        <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
                            <Ionicons name="arrow-back" size={22} color={Colors.textWhite} />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Center: title + subtitle */}
                <View style={styles.center}>
                    <Text style={styles.title} numberOfLines={1}>{title}</Text>
                    {subtitle ? (
                        <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
                    ) : null}
                </View>

                {/* Right: notification bell icon */}
                <View style={styles.right}>
                    <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
                        <Ionicons name="notifications-outline" size={22} color={Colors.textWhite} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: Colors.primary,
        // Extra top padding on Android to account for status bar
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 28 : 0,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.lg,
    },
    left: {
        width: 36,
        alignItems: 'flex-start',
    },
    center: {
        flex: 1,
        alignItems: 'center',
    },
    right: {
        width: 36,
        alignItems: 'flex-end',
    },
    title: {
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
        color: Colors.textWhite,
        letterSpacing: 0.3,
    },
    subtitle: {
        fontSize: FontSize.xs,
        color: Colors.primaryLight,
        marginTop: 2,
        letterSpacing: 0.2,
    },
    backBtn: {
        padding: 4,
    },
    iconBtn: {
        padding: 4,
    },
});
