// ============================================================
// app/(tabs)/profile.jsx
// Profile screen — Student details, photo, academic info
// ============================================================

import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '../../components/common/AppHeader';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius, Shadows } from '../../constants/theme';
import { STUDENT } from '../../data/studentData';



const INFO_ROWS = [
    { icon: 'school-outline', label: 'Enrollment No.', value: STUDENT.enrollment },
    { icon: 'book-outline', label: 'Course', value: STUDENT.course },
    { icon: 'business-outline', label: 'College', value: STUDENT.college },
    { icon: 'laptop-outline', label: 'Subject', value: STUDENT.subject },
    { icon: 'calendar-outline', label: 'Academic Year', value: '2025 – 2026' },
    { icon: 'location-outline', label: 'Location', value: 'Gandhinagar, Gujarat' },
];

const STATS = [
    { icon: 'document-text-outline', label: 'Surveys', value: '24' },
    { icon: 'checkmark-circle-outline', label: 'Done', value: '18' },
    { icon: 'time-outline', label: 'Pending', value: '6' },
];

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <AppHeader title="My Profile" />

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* ─── Hero card ─── */}
                <View style={styles.heroCard}>
                    <View style={styles.avatarWrapper}>
                        <View style={[styles.avatar, styles.avatarPlaceholder]}>
                            <Ionicons name="person" size={56} color={Colors.primary} />
                        </View>
                        <View style={styles.onlineDot} />
                    </View>

                    <Text style={styles.name}>{STUDENT.name}</Text>
                    <Text style={styles.role}>Field Survey Inspector</Text>

                    <View style={styles.badgeRow}>
                        <View style={styles.badge}>
                            <Ionicons name="ribbon-outline" size={13} color={Colors.primary} />
                            <Text style={styles.badgeText}>Active Student</Text>
                        </View>
                    </View>
                </View>

                {/* ─── Stats row ─── */}
                <View style={styles.statsRow}>
                    {STATS.map((s, i) => (
                        <View key={i} style={styles.statCard}>
                            <Ionicons name={s.icon} size={22} color={Colors.primary} />
                            <Text style={styles.statValue}>{s.value}</Text>
                            <Text style={styles.statLabel}>{s.label}</Text>
                        </View>
                    ))}
                </View>

                {/* ─── Academic info ─── */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Academic Information</Text>
                    {INFO_ROWS.map((row, i) => (
                        <View key={i} style={[styles.infoRow, i < INFO_ROWS.length - 1 && styles.infoRowBorder]}>
                            <View style={styles.infoIcon}>
                                <Ionicons name={row.icon} size={18} color={Colors.primary} />
                            </View>
                            <View style={styles.infoText}>
                                <Text style={styles.infoLabel}>{row.label}</Text>
                                <Text style={styles.infoValue}>{row.value}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* ─── Skills ─── */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Skills</Text>
                    <View style={styles.skillsWrap}>
                        {['React Native', 'Expo SDK 54', 'JavaScript', 'REST API', 'Git', 'UI/UX'].map((skill, i) => (
                            <View key={i} style={styles.skillChip}>
                                <Text style={styles.skillText}>{skill}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* ─── Edit profile button ─── */}
                <TouchableOpacity style={styles.editBtn} activeOpacity={0.8}>
                    <Ionicons name="pencil-outline" size={18} color={Colors.textWhite} />
                    <Text style={styles.editBtnText}>Edit Profile</Text>
                </TouchableOpacity>

                <View style={{ height: 30 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scroll: { flex: 1 },
    content: { padding: Spacing.xl },

    /* Hero Card */
    heroCard: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
        paddingVertical: Spacing.xxxl,
        paddingHorizontal: Spacing.xl,
        marginBottom: Spacing.lg,
        ...Shadows.md,
    },
    avatarWrapper: {
        position: 'relative',
        marginBottom: Spacing.lg,
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 4,
        borderColor: Colors.primary,
    },
    avatarPlaceholder: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.successLight,
    },
    onlineDot: {
        position: 'absolute',
        bottom: 4,
        right: 4,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#22C55E',
        borderWidth: 2,
        borderColor: Colors.surface,
    },
    name: {
        fontSize: FontSize.xxl,
        fontWeight: FontWeight.extraBold,
        color: Colors.textPrimary,
        marginBottom: 4,
        letterSpacing: 0.3,
    },
    role: {
        fontSize: FontSize.md,
        color: Colors.textSecondary,
        fontWeight: FontWeight.medium,
        marginBottom: Spacing.md,
    },
    badgeRow: {
        flexDirection: 'row',
        gap: 8,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: Colors.successLight,
        borderRadius: BorderRadius.full,
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    badgeText: {
        fontSize: FontSize.xs,
        color: Colors.primary,
        fontWeight: FontWeight.semiBold,
    },

    /* Stats */
    statsRow: {
        flexDirection: 'row',
        gap: Spacing.md,
        marginBottom: Spacing.lg,
    },
    statCard: {
        flex: 1,
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
        paddingVertical: Spacing.lg,
        ...Shadows.sm,
    },
    statValue: {
        fontSize: FontSize.xl,
        fontWeight: FontWeight.extraBold,
        color: Colors.textPrimary,
        marginTop: 4,
    },
    statLabel: {
        fontSize: FontSize.xs,
        color: Colors.textMuted,
        marginTop: 2,
    },

    /* Section */
    section: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.xl,
        marginBottom: Spacing.lg,
        ...Shadows.sm,
    },
    sectionTitle: {
        fontSize: FontSize.md,
        fontWeight: FontWeight.bold,
        color: Colors.textPrimary,
        marginBottom: Spacing.lg,
        letterSpacing: 0.2,
    },

    /* Info rows */
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.md,
    },
    infoRowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    infoIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: Colors.successLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
    },
    infoText: { flex: 1 },
    infoLabel: {
        fontSize: FontSize.xs,
        color: Colors.textMuted,
        fontWeight: FontWeight.medium,
        marginBottom: 2,
    },
    infoValue: {
        fontSize: FontSize.sm,
        color: Colors.textPrimary,
        fontWeight: FontWeight.semiBold,
    },

    /* Skills */
    skillsWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    skillChip: {
        backgroundColor: Colors.primaryLight,
        borderRadius: BorderRadius.full,
        paddingHorizontal: 14,
        paddingVertical: 6,
    },
    skillText: {
        fontSize: FontSize.xs,
        color: Colors.primaryDark,
        fontWeight: FontWeight.semiBold,
    },

    /* Edit button */
    editBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: Colors.primary,
        borderRadius: BorderRadius.md,
        paddingVertical: Spacing.lg,
        ...Shadows.md,
    },
    editBtnText: {
        fontSize: FontSize.md,
        fontWeight: FontWeight.bold,
        color: Colors.textWhite,
    },
});
