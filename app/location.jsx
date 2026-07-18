import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import AppHeader from '../components/common/AppHeader';
import { Colors, Spacing, FontSize, BorderRadius, FontWeight, Shadows } from '../constants/theme';

export default function LocationScreen() {
    const navigation = useNavigation();
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchLocation = async () => {
        setLoading(true);
        setErrorMsg(null);

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            setLoading(false);
            return;
        }

        try {
            let loc = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced
            });
            setLocation(loc);
        } catch (err) {
            setErrorMsg('Failed to get current location. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLocation();
    }, []);

    const copyToClipboard = async () => {
        if (location) {
            const locString = `Lat: ${location.coords.latitude}, Long: ${location.coords.longitude}`;
            await Clipboard.setStringAsync(locString);
            Alert.alert('Success', 'Location copied to clipboard!');
        }
    };

    return (
        <View style={styles.container}>
            <AppHeader
                title="Location"
                showBack={true}
                onBack={() => navigation.dispatch(DrawerActions.openDrawer())}
            />

            <View style={styles.content}>
                <View style={styles.card}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="location" size={48} color={Colors.primary} />
                    </View>

                    <Text style={styles.title}>Current Location</Text>

                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color={Colors.primary} />
                            <Text style={styles.loadingText}>Fetching location...</Text>
                        </View>
                    ) : errorMsg ? (
                        <View style={styles.errorContainer}>
                            <Ionicons name="warning-outline" size={32} color={Colors.danger} />
                            <Text style={styles.errorText}>{errorMsg}</Text>
                        </View>
                    ) : location ? (
                        <View style={styles.detailsContainer}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Latitude:</Text>
                                <Text style={styles.value}>{location.coords.latitude.toFixed(6)}</Text>
                            </View>
                            <View style={styles.divider} />

                            <View style={styles.row}>
                                <Text style={styles.label}>Longitude:</Text>
                                <Text style={styles.value}>{location.coords.longitude.toFixed(6)}</Text>
                            </View>
                            <View style={styles.divider} />

                            <View style={styles.row}>
                                <Text style={styles.label}>Accuracy:</Text>
                                <Text style={styles.value}>±{location.coords.accuracy.toFixed(2)} meters</Text>
                            </View>
                        </View>
                    ) : null}

                    {/* Actions */}
                    <View style={styles.actionContainer}>
                        <Pressable
                            style={[styles.btn, styles.btnOutline]}
                            onPress={fetchLocation}
                            disabled={loading}
                        >
                            <Ionicons name="refresh" size={20} color={loading ? Colors.textMuted : Colors.primary} />
                            <Text style={[styles.btnText, styles.btnTextOutline, loading && { color: Colors.textMuted }]}>
                                Refresh
                            </Text>
                        </Pressable>

                        <Pressable
                            style={[
                                styles.btn,
                                styles.btnPrimary,
                                (!location || loading) && styles.btnDisabled
                            ]}
                            onPress={copyToClipboard}
                            disabled={!location || loading}
                        >
                            <Ionicons name="copy-outline" size={20} color={Colors.textWhite} />
                            <Text style={styles.btnText}>Copy</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
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
        padding: Spacing.xl,
        justifyContent: 'center',
    },
    card: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.xl,
        padding: Spacing.xl,
        alignItems: 'center',
        ...Shadows.md,
    },
    iconContainer: {
        backgroundColor: Colors.primaryLight,
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    title: {
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
        color: Colors.textPrimary,
        marginBottom: Spacing.lg,
    },
    loadingContainer: {
        padding: Spacing.xl,
        alignItems: 'center',
        minHeight: 150,
        justifyContent: 'center',
    },
    loadingText: {
        marginTop: Spacing.md,
        color: Colors.textSecondary,
        fontSize: FontSize.md,
    },
    errorContainer: {
        padding: Spacing.lg,
        alignItems: 'center',
        backgroundColor: Colors.dangerLight,
        borderRadius: BorderRadius.md,
        minHeight: 150,
        justifyContent: 'center',
        width: '100%',
    },
    errorText: {
        marginTop: Spacing.sm,
        color: Colors.danger,
        textAlign: 'center',
        fontWeight: FontWeight.medium,
    },
    detailsContainer: {
        width: '100%',
        backgroundColor: Colors.background,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        marginBottom: Spacing.xl,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: Spacing.sm,
    },
    label: {
        color: Colors.textSecondary,
        fontWeight: FontWeight.medium,
        fontSize: FontSize.md,
    },
    value: {
        color: Colors.textPrimary,
        fontWeight: FontWeight.bold,
        fontSize: FontSize.md,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
    },
    actionContainer: {
        flexDirection: 'row',
        width: '100%',
        gap: Spacing.md,
        marginTop: Spacing.md,
    },
    btn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.md,
        gap: Spacing.sm,
    },
    btnOutline: {
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    btnPrimary: {
        backgroundColor: Colors.primary,
    },
    btnDisabled: {
        backgroundColor: Colors.textMuted,
    },
    btnText: {
        color: Colors.textWhite,
        fontWeight: FontWeight.bold,
        fontSize: FontSize.md,
    },
    btnTextOutline: {
        color: Colors.primary,
    },
});
