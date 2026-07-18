import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Alert, ScrollView } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import AppHeader from '../components/common/AppHeader';
import { Colors, Spacing, FontSize, BorderRadius, FontWeight, Shadows } from '../constants/theme';

export default function ClipboardScreen() {
    const navigation = useNavigation();
    const [pastedText, setPastedText] = useState('');

    const copyToClipboard = async (text, label) => {
        await Clipboard.setStringAsync(text);
        Alert.alert('Copied!', `${label} copied to clipboard.`);
    };

    const pasteFromClipboard = async () => {
        const text = await Clipboard.getStringAsync();
        if (text) {
            setPastedText(text);
        } else {
            Alert.alert('Empty', 'Clipboard is currently empty.');
        }
    };

    const clearClipboard = async () => {
        await Clipboard.setStringAsync('');
        setPastedText('');
        Alert.alert('Cleared', 'Clipboard data has been cleared.');
    };

    return (
        <View style={styles.container}>
            <AppHeader
                title="Clipboard Tools"
                showBack={true}
                onBack={() => navigation.dispatch(DrawerActions.openDrawer())}
            />

            <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>

                <Text style={styles.sectionTitle}>Quick Copy</Text>
                <View style={styles.card}>
                    <Pressable
                        style={styles.actionRow}
                        onPress={() => copyToClipboard('SURV-2026-X89', 'Survey ID')}
                    >
                        <View style={styles.actionTextWrap}>
                            <Ionicons name="document-text-outline" size={20} color={Colors.primary} />
                            <Text style={styles.actionText}>Copy Survey ID</Text>
                        </View>
                        <Ionicons name="copy-outline" size={20} color={Colors.textMuted} />
                    </Pressable>
                    <View style={styles.divider} />

                    <Pressable
                        style={styles.actionRow}
                        onPress={() => copyToClipboard('+91 98765 43210', 'Contact Number')}
                    >
                        <View style={styles.actionTextWrap}>
                            <Ionicons name="call-outline" size={20} color={Colors.primary} />
                            <Text style={styles.actionText}>Copy Contact Number</Text>
                        </View>
                        <Ionicons name="copy-outline" size={20} color={Colors.textMuted} />
                    </Pressable>
                    <View style={styles.divider} />

                    <Pressable
                        style={styles.actionRow}
                        onPress={() => copyToClipboard('23.0225° N, 72.5714° E', 'Location')}
                    >
                        <View style={styles.actionTextWrap}>
                            <Ionicons name="location-outline" size={20} color={Colors.primary} />
                            <Text style={styles.actionText}>Copy Current Location</Text>
                        </View>
                        <Ionicons name="copy-outline" size={20} color={Colors.textMuted} />
                    </Pressable>
                </View>

                <Text style={styles.sectionTitle}>Paste Notes</Text>
                <View style={[styles.card, styles.pasteCard]}>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Pasted data will appear here..."
                        multiline
                        numberOfLines={4}
                        value={pastedText}
                        onChangeText={setPastedText}
                        textAlignVertical="top"
                    />
                    <Pressable style={styles.pasteBtn} onPress={pasteFromClipboard}>
                        <Ionicons name="clipboard-outline" size={18} color={Colors.primary} />
                        <Text style={styles.pasteBtnText}>Paste from Clipboard</Text>
                    </Pressable>
                </View>

                <Pressable style={styles.clearBtn} onPress={clearClipboard}>
                    <Ionicons name="trash-outline" size={20} color={Colors.textWhite} />
                    <Text style={styles.clearBtnText}>Clear Clipboard Data</Text>
                </Pressable>
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
        paddingBottom: Spacing.xxl * 2,
    },
    sectionTitle: {
        fontSize: FontSize.md,
        fontWeight: FontWeight.bold,
        color: Colors.textSecondary,
        marginBottom: Spacing.md,
        marginTop: Spacing.lg,
    },
    card: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.xl,
        padding: Spacing.md,
        ...Shadows.sm,
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.md,
    },
    actionTextWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    actionText: {
        fontSize: FontSize.md,
        fontWeight: FontWeight.medium,
        color: Colors.textPrimary,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
    },
    pasteCard: {
        padding: Spacing.lg,
    },
    textArea: {
        backgroundColor: Colors.background,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        fontSize: FontSize.md,
        color: Colors.textPrimary,
        minHeight: 120,
        marginBottom: Spacing.md,
    },
    pasteBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacing.md,
        backgroundColor: Colors.primaryLight,
        borderRadius: BorderRadius.md,
        gap: Spacing.sm,
    },
    pasteBtnText: {
        color: Colors.primaryDark,
        fontWeight: FontWeight.bold,
        fontSize: FontSize.md,
    },
    clearBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.danger,
        padding: Spacing.lg,
        borderRadius: BorderRadius.lg,
        marginTop: Spacing.xxxl,
        gap: Spacing.sm,
        ...Shadows.md,
    },
    clearBtnText: {
        color: Colors.textWhite,
        fontWeight: FontWeight.bold,
        fontSize: FontSize.lg,
    }
});
