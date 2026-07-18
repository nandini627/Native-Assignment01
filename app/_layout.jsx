import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight } from '../constants/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={styles.root}>
            <StatusBar style="light" backgroundColor={Colors.primary} />
            <Drawer
                screenOptions={{
                    headerShown: false,
                    drawerActiveTintColor: Colors.primary,
                    drawerInactiveTintColor: Colors.textSecondary,
                    drawerActiveBackgroundColor: Colors.primaryLight,
                    drawerStyle: {
                        backgroundColor: Colors.surface,
                        width: 270,
                    },
                    drawerLabelStyle: {
                        fontSize: FontSize.md,
                        fontWeight: FontWeight.semiBold,
                        marginLeft: -8,
                    },
                }}
            >
                <Drawer.Screen
                    name="(tabs)"
                    options={{
                        title: 'Dashboard',
                        drawerIcon: ({ color, size }) => (
                            <Ionicons name="home-outline" size={size} color={color} />
                        ),
                    }}
                />

                <Drawer.Screen
                    name="camera"
                    options={{
                        title: 'Camera',
                        drawerIcon: ({ color, size }) => (
                            <Ionicons name="camera-outline" size={size} color={color} />
                        ),
                    }}
                />

                <Drawer.Screen
                    name="index"
                    options={{
                        drawerItemStyle: { display: 'none' } // Hide index from drawer menu
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
});
