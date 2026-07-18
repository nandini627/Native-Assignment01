import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, router } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import AppHeader from '../../components/common/AppHeader';
import { Colors, Spacing, FontSize, BorderRadius, FontWeight, Shadows } from '../../constants/theme';
import { RECENT_SURVEYS } from '../../data/studentData'; // base dummy data

// Expand initial dummy data for realistic layout
const INITIAL_DATA = [
    ...RECENT_SURVEYS,
    { id: '4', siteName: 'Riverside Bridge', clientName: 'Govt. Dept', priority: 'High', date: '14-07-2026', status: 'Pending' },
    { id: '5', siteName: 'City Mall Phase 2', clientName: 'DLF Group', priority: 'Medium', date: '13-07-2026', status: 'Completed' },
    { id: '6', siteName: 'Highway Expansion', clientName: 'NHAI', priority: 'Low', date: '12-07-2026', status: 'Pending' },
];

export default function HistoryScreen() {
    const navigation = useNavigation();
    const [surveys, setSurveys] = useState(INITIAL_DATA);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterPriority, setFilterPriority] = useState('All'); // 'All', 'High', 'Medium', 'Low'

    const handleSearch = (text) => {
        setSearchQuery(text);
    };

    const handleFilter = (priorityOption) => {
        setFilterPriority(priorityOption);
    };

    const viewSurveyDetails = (survey) => {
        // Navigate to the preview screen we made earlier
        router.push('/survey-preview');
    };

    const deleteSurvey = (surveyId) => {
        Alert.alert(
            'Delete Survey',
            'Are you sure you want to permanently delete this survey?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        setSurveys(current => current.filter(s => s.id !== surveyId));
                        Alert.alert('Deleted', 'Survey has been deleted.');
                    }
                }
            ]
        );
    };

    // Apply filtering logic
    const displayedSurveys = surveys.filter(survey => {
        const matchesSearch =
            survey.siteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            survey.clientName.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesPriority = filterPriority === 'All' || survey.priority === filterPriority;

        return matchesSearch && matchesPriority;
    });

    // Sub-components
    const PriorityBadge = ({ priority }) => {
        const bg = priority === 'High' ? Colors.dangerLight : (priority === 'Medium' ? Colors.warningLight : Colors.primaryLight);
        const text = priority === 'High' ? Colors.danger : (priority === 'Medium' ? Colors.textSecondary : Colors.primaryDark);
        return (
            <View style={[styles.badge, { backgroundColor: bg }]}>
                <Text style={[styles.badgeText, { color: text }]}>{priority}</Text>
            </View>
        );
    };

    const StatusDot = ({ status }) => (
        <View style={[styles.statusDot, { backgroundColor: status === 'Completed' ? Colors.primary : Colors.textMuted }]} />
    );

    const renderSurveyItem = ({ item }) => (
        <Pressable style={styles.card} onPress={() => viewSurveyDetails(item)}>
            <View style={styles.cardHeader}>
                <View style={styles.titleWrap}>
                    <StatusDot status={item.status} />
                    <Text style={styles.siteName} numberOfLines={1}>{item.siteName}</Text>
                </View>
                <PriorityBadge priority={item.priority} />
            </View>

            <View style={styles.cardBody}>
                <View style={styles.infoRow}>
                    <Ionicons name="business-outline" size={16} color={Colors.textMuted} />
                    <Text style={styles.infoText}>{item.clientName}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="calendar-outline" size={16} color={Colors.textMuted} />
                    <Text style={styles.infoText}>{item.date}</Text>
                </View>
            </View>

            <View style={styles.cardFooter}>
                <Text style={styles.statusText}>{item.status}</Text>
                <Pressable
                    onPress={() => deleteSurvey(item.id)}
                    style={styles.deleteBtn}
                    hitSlop={10}
                >
                    <Ionicons name="trash-outline" size={18} color={Colors.danger} />
                </Pressable>
            </View>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <AppHeader
                title="Survey History"
                showBack={true}
                onBack={() => navigation.dispatch(DrawerActions.openDrawer())}
            />

            {/* Filter & Search Header */}
            <View style={styles.headerSection}>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color={Colors.textMuted} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search site or client..."
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />
                    {searchQuery.length > 0 && (
                        <Pressable onPress={() => handleSearch('')} style={styles.clearBtn}>
                            <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
                        </Pressable>
                    )}
                </View>

                <View style={styles.filterContainer}>
                    {['All', 'High', 'Medium', 'Low'].map(p => (
                        <Pressable
                            key={p}
                            style={[
                                styles.filterChip,
                                filterPriority === p && styles.filterChipActive
                            ]}
                            onPress={() => handleFilter(p)}
                        >
                            <Text style={[
                                styles.filterChipText,
                                filterPriority === p && styles.filterChipTextActive
                            ]}>{p}</Text>
                        </Pressable>
                    ))}
                </View>

                <Text style={styles.resultsCount}>
                    {displayedSurveys.length} {displayedSurveys.length === 1 ? 'Survey' : 'Surveys'} Found
                </Text>
            </View>

            {/* FlatList */}
            <FlatList
                data={displayedSurveys}
                keyExtractor={item => item.id}
                renderItem={renderSurveyItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View style={styles.emptyState}>
                        <Ionicons name="document-text-outline" size={64} color={Colors.textMuted} />
                        <Text style={styles.emptyTitle}>No Surveys Found</Text>
                        <Text style={styles.emptyDesc}>Try clearing your search or filter criteria.</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    headerSection: {
        backgroundColor: Colors.surface,
        padding: Spacing.xl,
        paddingTop: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
        ...Shadows.sm,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.background,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.md,
        marginBottom: Spacing.lg,
    },
    searchIcon: {
        marginRight: Spacing.sm,
    },
    searchInput: {
        flex: 1,
        height: 44,
        fontSize: FontSize.md,
        color: Colors.textPrimary,
    },
    clearBtn: {
        padding: Spacing.xs,
    },
    filterContainer: {
        flexDirection: 'row',
        gap: Spacing.sm,
        marginBottom: Spacing.md,
    },
    filterChip: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.full,
        backgroundColor: Colors.background,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    filterChipActive: {
        backgroundColor: Colors.primaryDark,
        borderColor: Colors.primaryDark,
    },
    filterChipText: {
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
        fontWeight: FontWeight.medium,
    },
    filterChipTextActive: {
        color: Colors.textWhite,
        fontWeight: FontWeight.bold,
    },
    resultsCount: {
        fontSize: FontSize.sm,
        color: Colors.textMuted,
        fontWeight: FontWeight.semiBold,
    },
    listContent: {
        padding: Spacing.xl,
        paddingBottom: Spacing.xxl * 2,
    },
    card: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.xl,
        padding: Spacing.lg,
        marginBottom: Spacing.md,
        borderLeftWidth: 4,
        borderLeftColor: Colors.primary,
        ...Shadows.sm,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    titleWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingRight: Spacing.md,
    },
    statusDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: Spacing.sm,
    },
    siteName: {
        fontSize: FontSize.md,
        fontWeight: FontWeight.bold,
        color: Colors.textPrimary,
        flex: 1,
    },
    badge: {
        paddingHorizontal: Spacing.sm,
        paddingVertical: 3,
        borderRadius: BorderRadius.full,
    },
    badgeText: {
        fontSize: FontSize.xs,
        fontWeight: FontWeight.bold,
    },
    cardBody: {
        gap: Spacing.xs,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    infoText: {
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Spacing.sm,
        paddingTop: Spacing.sm,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    statusText: {
        fontSize: FontSize.sm,
        color: Colors.textMuted,
        fontWeight: FontWeight.medium,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    deleteBtn: {
        padding: Spacing.xs,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 80,
    },
    emptyTitle: {
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
        color: Colors.textSecondary,
        marginTop: Spacing.lg,
        marginBottom: Spacing.xs,
    },
    emptyDesc: {
        fontSize: FontSize.sm,
        color: Colors.textMuted,
    },
});
