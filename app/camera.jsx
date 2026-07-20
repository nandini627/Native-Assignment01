import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import AppHeader from '../components/common/AppHeader';
import { Colors, Spacing, FontSize, BorderRadius, FontWeight, Shadows } from '../constants/theme';

export default function CameraScreen() {
    const navigation = useNavigation();
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
    const [photos, setPhotos] = useState([]);
    const photosRef = useRef([]);
    const [cameraLoading, setCameraLoading] = useState(true);
    const cameraRef = useRef(null);

    // Keep ref always in sync with state — avoids stale closures in callbacks
    const updatePhotos = useCallback((updaterFn) => {
        const updated = updaterFn(photosRef.current);
        photosRef.current = updated;
        setPhotos(updated);
    }, []);

    useEffect(() => {
        if (cameraPermission?.granted) {
            const timer = setTimeout(() => setCameraLoading(false), 800);
            return () => clearTimeout(timer);
        }
    }, [cameraPermission]);

    const takePicture = useCallback(async () => {
        if (cameraRef.current) {
            try {
                const photoData = await cameraRef.current.takePictureAsync();
                const newPhoto = {
                    id: Date.now().toString(),
                    uri: photoData.uri,
                    captureTime: new Date().toLocaleString(),
                    saved: false,
                };
                const updated = [newPhoto, ...photosRef.current];
                photosRef.current = updated;
                setPhotos(updated);
            } catch (error) {
                Alert.alert('Error', 'Failed to capture photo.');
            }
        }
    }, []);

    const deletePhoto = useCallback((id) => {
        Alert.alert(
            'Delete Photo',
            'Are you sure you want to delete this photo?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => updatePhotos(prev => prev.filter(photo => photo.id !== id)),
                },
            ]
        );
    }, [updatePhotos]);

    const saveToGallery = useCallback(async (photoId, photoUri, alreadySaved) => {
        if (alreadySaved) {
            Alert.alert('Already Saved', 'This photo is already in your gallery.');
            return;
        }
        let hasPermission = mediaPermission && mediaPermission.granted;
        if (!hasPermission) {
            const resp = await requestMediaPermission();
            hasPermission = resp.granted;
        }
        if (!hasPermission) {
            Alert.alert('Permission Denied', 'We need permission to save photos to your gallery.');
            return;
        }
        try {
            await MediaLibrary.createAssetAsync(photoUri);
            Alert.alert('Saved!', 'Photo has been saved to your gallery.');
            updatePhotos(prev =>
                prev.map(p => p.id === photoId ? { ...p, saved: true } : p)
            );
        } catch (err) {
            Alert.alert('Error', 'Failed to save photo. Please try again.');
        }
    }, [mediaPermission, updatePhotos]);

    // --- All hooks are above this line, conditional renders below are safe ---

    if (!cameraPermission) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (!cameraPermission.granted) {
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
                    <Pressable style={styles.btn} onPress={requestCameraPermission}>
                        <Text style={styles.btnText}>Grant Camera Permission</Text>
                    </Pressable>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <AppHeader
                title="Camera"
                showBack={true}
                onBack={() => navigation.dispatch(DrawerActions.openDrawer())}
            />

            {/* TOP: Fixed Camera Viewfinder */}
            <View style={styles.topCameraSection}>
                {cameraLoading && (
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color={Colors.primary} />
                        <Text style={styles.loadingText}>Loading Camera...</Text>
                    </View>
                )}
                <CameraView
                    style={styles.camera}
                    ref={cameraRef}
                    onCameraReady={() => setCameraLoading(false)}
                />
                <View style={styles.controlsOverlay}>
                    <Pressable style={styles.captureBtn} onPress={takePicture}>
                        <View style={styles.captureInnerBtn} />
                    </Pressable>
                </View>
            </View>

            {/* BOTTOM: Scrollable Photo Gallery */}
            <ScrollView style={styles.bottomSection} contentContainerStyle={styles.galleryContent}>
                <Text style={styles.galleryTitle}>
                    {photos.length === 0 ? 'No photos yet' : `${photos.length} Photo${photos.length > 1 ? 's' : ''} Captured`}
                </Text>

                {photos.length === 0 ? (
                    <View style={styles.emptyGallery}>
                        <Ionicons name="images-outline" size={40} color={Colors.textMuted} />
                        <Text style={styles.emptyGalleryText}>Tap the shutter button above to capture photos.</Text>
                    </View>
                ) : (
                    photos.map(p => (
                        <View key={p.id} style={styles.photoCard}>
                            <Image source={{ uri: p.uri }} style={styles.thumbnail} />
                            <View style={styles.photoInfo}>
                                <View style={styles.timeRow}>
                                    <Ionicons name="time-outline" size={14} color={Colors.textSecondary} />
                                    <Text style={styles.captureTimeText}>{p.captureTime}</Text>
                                </View>
                                <View style={styles.actionRow}>
                                    <Pressable
                                        style={[styles.actionBtn, p.saved ? styles.savedBtn : styles.saveBtn]}
                                        onPress={() => saveToGallery(p.id, p.uri, p.saved)}
                                    >
                                        <Ionicons
                                            name={p.saved ? 'checkmark-circle' : 'download-outline'}
                                            size={16}
                                            color={p.saved ? Colors.success : Colors.primaryDark}
                                        />
                                        <Text style={[styles.saveBtnText, p.saved && { color: Colors.success }]}>
                                            {p.saved ? 'Saved' : 'Save to Gallery'}
                                        </Text>
                                    </Pressable>
                                    <Pressable
                                        style={[styles.actionBtn, styles.deleteBtn]}
                                        onPress={() => deletePhoto(p.id)}
                                    >
                                        <Ionicons name="trash-outline" size={16} color={Colors.danger} />
                                        <Text style={styles.deleteBtnText}>Delete</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    permissionContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.xl },
    message: { textAlign: 'center', marginTop: Spacing.md, marginBottom: Spacing.xl, fontSize: FontSize.lg, color: Colors.textSecondary },
    btn: { backgroundColor: Colors.primary, paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md, borderRadius: BorderRadius.md },
    btnText: { color: Colors.textWhite, fontWeight: FontWeight.bold, fontSize: FontSize.md },

    topCameraSection: { height: '43%', backgroundColor: '#000', position: 'relative' },
    camera: { flex: 1 },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    loadingText: { marginTop: Spacing.md, color: Colors.textSecondary, fontWeight: FontWeight.medium },
    controlsOverlay: {
        position: 'absolute',
        bottom: Spacing.lg,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 5,
    },
    captureBtn: {
        width: 64,
        height: 64,
        borderRadius: 32,
        borderWidth: 3,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    captureInnerBtn: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#fff' },

    bottomSection: { flex: 1, backgroundColor: Colors.background },
    galleryContent: { padding: Spacing.lg, paddingBottom: Spacing.xxl * 2 },
    galleryTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.textSecondary, marginBottom: Spacing.md },

    emptyGallery: { alignItems: 'center', paddingVertical: Spacing.xxl },
    emptyGalleryText: { marginTop: Spacing.sm, color: Colors.textMuted, fontSize: FontSize.sm, textAlign: 'center' },

    photoCard: {
        flexDirection: 'row',
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginBottom: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
        ...Shadows.sm,
    },
    thumbnail: { width: 90, height: 90, borderRadius: BorderRadius.sm },
    photoInfo: { flex: 1, marginLeft: Spacing.md, justifyContent: 'space-between' },
    timeRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
    captureTimeText: { color: Colors.textPrimary, fontSize: FontSize.sm, fontWeight: FontWeight.medium, flexShrink: 1 },

    actionRow: { flexDirection: 'row', gap: Spacing.sm },
    actionBtn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.sm,
        gap: 4,
    },
    saveBtn: { backgroundColor: Colors.primaryLight },
    savedBtn: { backgroundColor: Colors.primaryLight, opacity: 0.7 },
    deleteBtn: { backgroundColor: Colors.dangerLight },
    saveBtnText: { color: Colors.primaryDark, fontWeight: FontWeight.bold, fontSize: FontSize.xs },
    deleteBtnText: { color: Colors.danger, fontWeight: FontWeight.bold, fontSize: FontSize.xs },
});
