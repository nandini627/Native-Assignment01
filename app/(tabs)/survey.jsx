import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { Colors, Spacing, FontSize, BorderRadius, FontWeight, Shadows } from '../../constants/theme';
import AppHeader from '../../components/common/AppHeader';

export default function SurveyScreen() {
    const navigation = useNavigation();

    const [siteName, setSiteName] = useState('');
    const [clientName, setClientName] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Medium');

    // Defaulting to current date
    const [date, setDate] = useState(new Date().toLocaleDateString('en-GB')); // DD/MM/YYYY

    const priorities = ['Low', 'Medium', 'High'];

    const handleSubmit = () => {
        if (!siteName.trim()) {
            Alert.alert('Validation Error', 'Site Name is required');
            return;
        }
        if (!clientName.trim()) {
            Alert.alert('Validation Error', 'Client Name is required');
            return;
        }
        if (!description.trim()) {
            Alert.alert('Validation Error', 'Description is required');
            return;
        }
        if (!date.trim()) {
            Alert.alert('Validation Error', 'Date is required');
            return;
        }

        Alert.alert('Success', 'Survey saved successfully.');

        // Reset form
        setSiteName('');
        setClientName('');
        setDescription('');
        setPriority('Medium');
    };

    return (
        <View style={styles.container}>
            <AppHeader
                title="New Survey"
                showBack={true}
                onBack={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
            <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>

                <Text style={styles.label}>Site Name *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter site name"
                    value={siteName}
                    onChangeText={setSiteName}
                />

                <Text style={styles.label}>Client Name *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter client name"
                    value={clientName}
                    onChangeText={setClientName}
                />

                <Text style={styles.label}>Date *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="DD/MM/YYYY"
                    value={date}
                    onChangeText={setDate}
                />

                <Text style={styles.label}>Priority</Text>
                <View style={styles.priorityContainer}>
                    {priorities.map(p => (
                        <Pressable
                            key={p}
                            style={[
                                styles.priorityBtn,
                                priority === p && styles.priorityBtnActive
                            ]}
                            onPress={() => setPriority(p)}
                        >
                            <Text style={[
                                styles.priorityText,
                                priority === p && styles.priorityTextActive
                            ]}>{p}</Text>
                        </Pressable>
                    ))}
                </View>

                <Text style={styles.label}>Description *</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Enter survey description"
                    multiline
                    numberOfLines={4}
                    value={description}
                    onChangeText={setDescription}
                    textAlignVertical="top"
                />

                <Pressable style={styles.submitBtn} onPress={handleSubmit}>
                    <Text style={styles.submitBtnText}>Submit Survey</Text>
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
    label: {
        fontSize: FontSize.md,
        fontWeight: FontWeight.semiBold,
        color: Colors.textPrimary,
        marginBottom: Spacing.xs,
        marginTop: Spacing.lg,
    },
    input: {
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        fontSize: FontSize.md,
        color: Colors.textPrimary,
    },
    textArea: {
        minHeight: 100,
    },
    priorityContainer: {
        flexDirection: 'row',
        gap: Spacing.sm,
        marginTop: Spacing.xs,
    },
    priorityBtn: {
        flex: 1,
        paddingVertical: Spacing.sm,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: BorderRadius.md,
        backgroundColor: Colors.surface,
    },
    priorityBtnActive: {
        backgroundColor: Colors.primaryLight,
        borderColor: Colors.primary,
    },
    priorityText: {
        color: Colors.textSecondary,
        fontWeight: FontWeight.medium,
    },
    priorityTextActive: {
        color: Colors.primaryDark,
        fontWeight: FontWeight.bold,
    },
    submitBtn: {
        backgroundColor: Colors.primary,
        padding: Spacing.lg,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
        marginTop: Spacing.xxxl,
        ...Shadows.md,
    },
    submitBtnText: {
        color: Colors.textWhite,
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
    }
});
