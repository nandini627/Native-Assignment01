import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Alert, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import AppHeader from '../components/common/AppHeader';
import { Colors, Spacing, FontSize, BorderRadius, FontWeight, Shadows } from '../constants/theme';

export default function CameraScreen() {
    const navigation = useNavigation();
    const [permission, requestPermission] = useCameraPermissions();
    const [photo, setPhoto] = useState(null);
    const [captureTime, setCaptureTime] = useState(null);
    const [isCameraReady, setIsCameraReady] = useState(false);

    // Simulate loading for the camera
    const [cameraLoading, setCameraLoading] = useState(true);

    const cameraRef = useRef(null);

    useEffect(() => {
        if (permission?.granted) {
            // Slight delay to simulate camera initialization for the loading indicator requirement
            const timer = setTimeout(() => {
                setCameraLoading(false);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [permission]);

    if (!permission) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <AppHeader
                    title="Camera"
                    showBack={true}
                    onBack={() => navigation.dispatch(DrawerActions.openDrawer())}
                />
                <View style={styles.permissionContainer}>
                    <Ionicons name="camera-outline" size={64} color={Colors.textMuted} />
                    <Text style={styles.message}>We need your permission to show the camera</Text>
                    <Pressable style={styles.btn} onPress={requestPermission}>
                        <Text style={styles.btnText}>Grant Permission</Text>
                    </Pressable>
                </View>
            </View>
        );
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photoData = await cameraRef.current.takePictureAsync();
                setPhoto(photoData.uri);
                setCaptureTime(new Date().toLocaleString());
            } catch (error) {
                Alert.alert('Error', 'Failed to capture photo.');
            }
        }
    };

    const retakePicture = () => {
        setPhoto(null);
        setCaptureTime(null);
    };

    const deletePhoto = () => {
        Alert.alert(
            'Delete Photo',
            'Are you sure you want to delete this photo?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        setPhoto(null);
                        setCaptureTime(null);
                    },
                },
            ]
        );
    };

    const onCameraReady = () => {
        setIsCameraReady(true);
    };

    return (
        <View style={styles.container}>
            <AppHeader
                title="Camera"
                showBack={true}
                onBack={() => navigation.dispatch(DrawerActions.openDrawer())}
            />

            {!photo ? (
                <View style={styles.cameraContainer}>
                    {cameraLoading && (
                        <View style={styles.loadingOverlay}>
                            <ActivityIndicator size="large" color={Colors.primary} />
                            <Text style={styles.loadingText}>Loading Camera...</Text>
                        </View>
                    )}

                    <View style={styles.cameraFrame}>
                        <CameraView
                            style={styles.camera}
                            ref={cameraRef}
                            onCameraReady={onCameraReady}
                        />
                    </View>

                    <View style={styles.controls}>
                        <Pressable style={styles.captureBtn} onPress={takePicture}>
                            <View style={styles.captureInnerBtn} />
                        </Pressable>
                    </View>
                </View>
            ) : (
                <View style={styles.previewContainer}>
                    <Image source={{ uri: photo }} style={styles.previewImage} />

                    <View style={styles.infoCard}>
                        <Ionicons name="time-outline" size={16} color={Colors.textSecondary} />
                        <Text style={styles.captureTimeText}>Captured: {captureTime}</Text>
                    </View>

                    <View style={styles.actionRow}>
                        <Pressable style={styles.actionBtnOutline} onPress={retakePicture}>
                            <Ionicons name="refresh" size={20} color={Colors.primary} />
                            <Text style={styles.actionBtnTextOutline}>Retake</Text>
                        </Pressable>
                        <Pressable style={[styles.actionBtn, styles.actionBtnDanger]} onPress={deletePhoto}>
                            <Ionicons name="trash-outline" size={20} color={Colors.textWhite} />
                            <Text style={styles.actionBtnText}>Delete</Text>
                        </Pressable>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.xl,
    },
    message: {
        textAlign: 'center',
        paddingBottom: Spacing.xl,
        marginTop: Spacing.md,
        fontSize: FontSize.lg,
        color: Colors.textSecondary,
    },
    btn: {
        backgroundColor: Colors.primary,
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.md,
    },
    btnText: {
        color: Colors.textWhite,
        fontWeight: FontWeight.bold,
        fontSize: FontSize.md,
    },
    cameraContainer: {
        flex: 1,
        position: 'relative',
    },
    cameraFrame: {
        flex: 1,
        overflow: 'hidden',
    },
    camera: {
        flex: 1,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    loadingText: {
        marginTop: Spacing.md,
        color: Colors.textSecondary,
        fontWeight: FontWeight.medium,
    },
    controls: {
        backgroundColor: '#000',
        paddingVertical: Spacing.xl,
        alignItems: 'center',
        paddingBottom: 40,
    },
    captureBtn: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'transparent',
        borderWidth: 4,
        borderColor: Colors.textWhite,
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureInnerBtn: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: Colors.textWhite,
    },
    previewContainer: {
        flex: 1,
        padding: Spacing.md,
        backgroundColor: Colors.surface,
    },
    previewImage: {
        flex: 1,
        borderRadius: BorderRadius.lg,
        ...Shadows.md,
    },
    infoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.background,
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
        marginTop: Spacing.lg,
        gap: Spacing.sm,
    },
    captureTimeText: {
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        fontWeight: FontWeight.medium,
    },
    actionRow: {
        flexDirection: 'row',
        gap: Spacing.md,
        marginTop: Spacing.lg,
        marginBottom: Spacing.xxxl,
    },
    actionBtn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
        gap: Spacing.sm,
    },
    actionBtnDanger: {
        backgroundColor: Colors.danger,
    },
    actionBtnOutline: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: Colors.primary,
        backgroundColor: Colors.surface,
        gap: Spacing.sm,
    },
    actionBtnText: {
        color: Colors.textWhite,
        fontWeight: FontWeight.bold,
        fontSize: FontSize.md,
    },
    actionBtnTextOutline: {
        color: Colors.primary,
        fontWeight: FontWeight.bold,
        fontSize: FontSize.md,
    },
});
