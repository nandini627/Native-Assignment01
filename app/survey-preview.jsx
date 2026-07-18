import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, router } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import AppHeader from '../components/common/AppHeader';
import { Colors, Spacing, FontSize, BorderRadius, FontWeight, Shadows } from '../constants/theme';

export default function SurveyPreviewScreen() {
    const navigation = useNavigation();

    // Mock data for preview (this would typically come via global state or route params)
    const previewData = {
        siteName: 'ABC Construction Site',
        clientName: 'Reliance Ltd.',
        date: '18/07/2026',
        priority: 'High',
        description: 'Initial excavation work started. Need more resources for the eastern wing.',
        location: '23.0225° N, 72.5714° E',
        contact: '+91 98765 43210',
        photoUri: 'https://images.unsplash.com/photo-1541888081198-5dd64663a8a3?q=80&w=600&auto=format&fit=crop', // mock image
    };

    const handleEdit = () => {
        Alert.alert('Edit', 'Navigating to edit screen...');
        // router.back() or router.push to edit mode
    };

    const handleSubmit = () => {
        Alert.alert(
            'Confirm Submission',
            'Are you sure you want to submit this survey?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Submit',
                    onPress: () => {
                        Alert.alert('Success', 'Survey successfully submitted!');
                        // Navigating back to Dashboard after submit as a typical flow
                        router.replace('/(tabs)');
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <AppHeader
                title="Survey Preview"
                showBack={true}
                onBack={() => navigation.dispatch(DrawerActions.openDrawer())}
            />

            <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>

                {/* Image Section */}
                <Image source={{ uri: previewData.photoUri }} style={styles.previewImage} />

                {/* Details Section */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Site Details</Text>
                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <Text style={styles.label}>Site Name</Text>
                        <Text style={styles.value}>{previewData.siteName}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Client Name</Text>
                        <Text style={styles.value}>{previewData.clientName}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Priority</Text>
                        <View style={[
                            styles.badge,
                            previewData.priority === 'High' ? styles.badgeHigh : styles.badgeNormal
                        ]}>
                            <Text style={
                                previewData.priority === 'High' ? styles.badgeTextHigh : styles.badgeTextNormal
                            }>{previewData.priority}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Date</Text>
                        <Text style={styles.value}>{previewData.date}</Text>
                    </View>
                </View>

                {/* Contacts & Location Section */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Contact & Location</Text>
                    <View style={styles.divider} />

                    <View style={styles.rowIcon}>
                        <Ionicons name="call-outline" size={20} color={Colors.primary} style={styles.rowIconSymbol} />
                        <View>
                            <Text style={styles.label}>Contact</Text>
                            <Text style={styles.value}>{previewData.contact}</Text>
                        </View>
                    </View>

                    <View style={styles.rowIcon}>
                        <Ionicons name="location-outline" size={20} color={Colors.primary} style={styles.rowIconSymbol} />
                        <View>
                            <Text style={styles.label}>Coordinates</Text>
                            <Text style={styles.value}>{previewData.location}</Text>
                        </View>
                    </View>
                </View>

                {/* Notes/Description */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Notes / Description</Text>
                    <View style={styles.divider} />
                    <Text style={styles.descText}>{previewData.description}</Text>
                </View>

                {/* Actions */}
                <View style={styles.actionContainer}>
                    <Pressable style={styles.editBtn} onPress={handleEdit}>
                        <Ionicons name="pencil-outline" size={20} color={Colors.primary} />
                        <Text style={styles.editBtnText}>Edit Survey</Text>
                    </Pressable>
                    <Pressable style={styles.submitBtn} onPress={handleSubmit}>
                        <Ionicons name="checkmark-circle-outline" size={20} color={Colors.textWhite} />
                        <Text style={styles.submitBtnText}>Submit Survey</Text>
                    </Pressable>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: Spacing.xl,
        paddingBottom: Spacing.xxl * 3,
    },
    previewImage: {
        width: '100%',
        height: 200,
        borderRadius: BorderRadius.xl,
        marginBottom: Spacing.xl,
        backgroundColor: Colors.surface,
        ...Shadows.md,
    },
    card: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.xl,
        padding: Spacing.xl,
        marginBottom: Spacing.lg,
        ...Shadows.md,
    },
    cardTitle: {
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
        color: Colors.textPrimary,
        marginBottom: Spacing.sm,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginBottom: Spacing.md,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    rowIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    rowIconSymbol: {
        marginRight: Spacing.md,
    },
    label: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        fontWeight: FontWeight.medium,
        marginBottom: 2,
    },
    value: {
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        fontWeight: FontWeight.semiBold,
    },
    descText: {
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        lineHeight: 22,
    },
    badge: {
        paddingHorizontal: Spacing.md,
        paddingVertical: 4,
        borderRadius: BorderRadius.full,
    },
    badgeHigh: {
        backgroundColor: Colors.dangerLight,
    },
    badgeNormal: {
        backgroundColor: Colors.primaryLight,
    },
    badgeTextHigh: {
        color: Colors.danger,
        fontWeight: FontWeight.bold,
        fontSize: FontSize.xs,
    },
    badgeTextNormal: {
        color: Colors.primaryDark,
        fontWeight: FontWeight.bold,
        fontSize: FontSize.xs,
    },
    actionContainer: {
        flexDirection: 'row',
        gap: Spacing.md,
        marginTop: Spacing.md,
    },
    editBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.primary,
        paddingVertical: Spacing.lg,
        borderRadius: BorderRadius.lg,
        gap: Spacing.sm,
        ...Shadows.sm,
    },
    editBtnText: {
        color: Colors.primary,
        fontWeight: FontWeight.bold,
        fontSize: FontSize.md,
    },
    submitBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.lg,
        borderRadius: BorderRadius.lg,
        gap: Spacing.sm,
        ...Shadows.md,
    },
    submitBtnText: {
        color: Colors.textWhite,
        fontWeight: FontWeight.bold,
        fontSize: FontSize.md,
    }
});
