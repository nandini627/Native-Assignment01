// ============================================================
// components/common/AppHeader.jsx
// Reusable top header used on every screen
// Props:
//   title      — screen title text
//   subtitle   — optional small subtitle below title
//   showBack   — show a back arrow (default false)
//   onBack     — callback when back arrow pressed
//   showHamburger — show hamburger menu icon (default false)
//   onHamburger   — callback when hamburger pressed
//   onProfilePress — callback when profile avatar pressed
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
import { useRouter } from 'expo-router';
import { Colors, FontSize, FontWeight, Spacing } from '../../constants/theme';



export default function AppHeader({
    title,
    subtitle,
    showBack = false,
    onBack,
    showHamburger = false,
    onHamburger,
    onProfilePress,
}) {
    const router = useRouter();

    const handleProfilePress = () => {
        if (onProfilePress) {
            onProfilePress();
        } else {
            router.push('/(tabs)/profile');
        }
    };

    return (
        <View style={styles.wrapper}>
            {/* Status bar area */}
            <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

            <View style={styles.container}>
                {/* Left: hamburger or back button */}
                <View style={styles.left}>
                    {showHamburger && (
                        <TouchableOpacity onPress={onHamburger} style={styles.iconBtn} activeOpacity={0.7}>
                            <Ionicons name="menu" size={26} color={Colors.textWhite} />
                        </TouchableOpacity>
                    )}
                    {!showHamburger && showBack && (
                        <TouchableOpacity onPress={onBack} style={styles.iconBtn} activeOpacity={0.7}>
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

                {/* Right: profile avatar */}
                <View style={styles.right}>
                    <TouchableOpacity style={styles.avatarBtn} onPress={handleProfilePress} activeOpacity={0.8}>
                        <View style={styles.avatar}>
                            <Ionicons name="person" size={20} color={Colors.textWhite} />
                        </View>
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
        width: 40,
        alignItems: 'flex-start',
    },
    center: {
        flex: 1,
        alignItems: 'center',
    },
    right: {
        width: 40,
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
    iconBtn: {
        padding: 4,
    },
    avatarBtn: {
        borderRadius: 999,
        borderWidth: 2,
        borderColor: Colors.primaryLight,
        overflow: 'hidden',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryDark,
    },
});
