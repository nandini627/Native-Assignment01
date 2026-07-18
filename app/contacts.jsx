import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, FlatList, TextInput,
    RefreshControl, Pressable, Alert, ActivityIndicator
} from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import AppHeader from '../components/common/AppHeader';
import { Colors, Spacing, FontSize, BorderRadius, FontWeight, Shadows } from '../constants/theme';

export default function ContactsScreen() {
    const navigation = useNavigation();

    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const loadContacts = async () => {
        setErrorMsg(null);
        let { status } = await Contacts.requestPermissionsAsync();

        if (status !== 'granted') {
            setErrorMsg('Permission to access contacts was denied');
            setLoading(false);
            setRefreshing(false);
            return;
        }

        try {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers],
                sort: Contacts.SortTypes.FirstName,
            });

            if (data.length > 0) {
                setContacts(data);
                setFilteredContacts(data);
            }
        } catch (err) {
            setErrorMsg('Failed to fetch contacts');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadContacts();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        loadContacts();
    };

    const handleSearch = (text) => {
        setSearchQuery(text);
        if (text) {
            const filtered = contacts.filter((contact) => {
                const name = contact.name ? contact.name.toLowerCase() : '';
                return name.includes(text.toLowerCase());
            });
            setFilteredContacts(filtered);
        } else {
            setFilteredContacts(contacts);
        }
    };

    const copyToClipboard = async (phoneNumber) => {
        if (phoneNumber) {
            await Clipboard.setStringAsync(phoneNumber);
            Alert.alert('Success', 'Contact number copied to clipboard');
        }
    };

    const renderItem = ({ item }) => {
        const firstNumber = item.phoneNumbers && item.phoneNumbers.length > 0
            ? item.phoneNumbers[0].number
            : null;

        const initial = item.name ? item.name.charAt(0).toUpperCase() : '?';

        return (
            <View style={styles.contactCard}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{initial}</Text>
                </View>

                <View style={styles.contactInfo}>
                    <Text style={styles.contactName} numberOfLines={1}>
                        {item.name || 'Unnamed Contact'}
                    </Text>
                    {firstNumber ? (
                        <Text style={styles.contactNumber}>{firstNumber}</Text>
                    ) : (
                        <Text style={styles.noNumber}>No Number</Text>
                    )}
                </View>

                {firstNumber && (
                    <Pressable
                        style={styles.copyBtn}
                        onPress={() => copyToClipboard(firstNumber)}
                    >
                        <Ionicons name="copy-outline" size={20} color={Colors.primary} />
                    </Pressable>
                )}
            </View>
        );
    };

    const EmptyState = () => (
        <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={64} color={Colors.textMuted} />
            <Text style={styles.emptyStateTitle}>No Contacts Found</Text>
            {searchQuery ? (
                <Text style={styles.emptyStateDesc}>
                    We couldn't find anyone matching "{searchQuery}".
                </Text>
            ) : (
                <Text style={styles.emptyStateDesc}>
                    Your contact list is empty or hasn't synced properly.
                </Text>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <AppHeader
                title="Contacts"
                showBack={true}
                onBack={() => navigation.dispatch(DrawerActions.openDrawer())}
            />

            {errorMsg ? (
                <View style={styles.errorContainer}>
                    <Ionicons name="warning-outline" size={48} color={Colors.danger} />
                    <Text style={styles.errorText}>{errorMsg}</Text>
                    <Pressable style={styles.retryBtn} onPress={loadContacts}>
                        <Text style={styles.retryBtnText}>Try Again</Text>
                    </Pressable>
                </View>
            ) : (
                <View style={styles.mainContent}>
                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={20} color={Colors.textMuted} style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search contacts..."
                            value={searchQuery}
                            onChangeText={handleSearch}
                            autoCorrect={false}
                        />
                        {searchQuery.length > 0 && (
                            <Pressable onPress={() => handleSearch('')} style={styles.clearBtn}>
                                <Ionicons name="close-circle" size={20} color={Colors.textMuted} />
                            </Pressable>
                        )}
                    </View>

                    {/* Contact Counter */}
                    {!loading && (
                        <Text style={styles.counterText}>
                            Showing {filteredContacts.length} {filteredContacts.length === 1 ? 'contact' : 'contacts'}
                        </Text>
                    )}

                    {loading && !refreshing ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color={Colors.primary} />
                            <Text style={styles.loadingText}>Loading Contacts...</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={filteredContacts}
                            keyExtractor={(item) => item.id}
                            renderItem={renderItem}
                            contentContainerStyle={styles.listContent}
                            ListEmptyComponent={<EmptyState />}
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                    colors={[Colors.primary]}
                                />
                            }
                        />
                    )}
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
    mainContent: {
        flex: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        margin: Spacing.xl,
        marginBottom: Spacing.sm,
        paddingHorizontal: Spacing.md,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    searchIcon: {
        marginRight: Spacing.sm,
    },
    searchInput: {
        flex: 1,
        height: 48,
        fontSize: FontSize.md,
        color: Colors.textPrimary,
    },
    clearBtn: {
        padding: Spacing.xs,
    },
    counterText: {
        marginLeft: Spacing.xl,
        marginBottom: Spacing.md,
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
        fontWeight: FontWeight.medium,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: Spacing.md,
        color: Colors.textSecondary,
    },
    listContent: {
        paddingHorizontal: Spacing.xl,
        paddingBottom: Spacing.xxl * 2,
        flexGrow: 1,
    },
    contactCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
        marginBottom: Spacing.sm,
        ...Shadows.sm,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    avatarText: {
        color: Colors.primaryDark,
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
    },
    contactInfo: {
        flex: 1,
    },
    contactName: {
        fontSize: FontSize.md,
        fontWeight: FontWeight.semiBold,
        color: Colors.textPrimary,
        marginBottom: 2,
    },
    contactNumber: {
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
    },
    noNumber: {
        fontSize: FontSize.sm,
        color: Colors.warning,
        fontStyle: 'italic',
    },
    copyBtn: {
        padding: Spacing.sm,
        backgroundColor: Colors.background,
        borderRadius: BorderRadius.full,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 100,
    },
    emptyStateTitle: {
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
        color: Colors.textPrimary,
        marginTop: Spacing.lg,
        marginBottom: Spacing.xs,
    },
    emptyStateDesc: {
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
        textAlign: 'center',
        paddingHorizontal: Spacing.xxl,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.xxl,
    },
    errorText: {
        fontSize: FontSize.md,
        color: Colors.danger,
        textAlign: 'center',
        marginTop: Spacing.md,
        marginBottom: Spacing.xl,
    },
    retryBtn: {
        backgroundColor: Colors.primary,
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.md,
    },
    retryBtnText: {
        color: Colors.textWhite,
        fontWeight: FontWeight.bold,
        fontSize: FontSize.md,
    },
});
