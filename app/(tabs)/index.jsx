import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Colors, Spacing, FontSize, FontWeight } from '../../constants/theme';
import { Text } from 'react-native';

import WelcomeBanner from '../../components/dashboard/WelcomeBanner';
import StudentCard from '../../components/dashboard/StudentCard';
import SurveyCountCard from '../../components/dashboard/SurveyCountCard';
import QuickActionCard from '../../components/dashboard/QuickActionCard';
import RecentSurveyList from '../../components/dashboard/RecentSurveyList';
import AppHeader from '../../components/common/AppHeader';

import { QUICK_ACTIONS, RECENT_SURVEYS } from '../../data/studentData';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';

export default function Dashboard() {
    const todaySurveyCount = 12;
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <AppHeader
                title="Dashboard"
                showBack={true}
                onBack={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
            <ScrollView
                style={styles.screen}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <WelcomeBanner />
                <StudentCard />
                <SurveyCountCard count={todaySurveyCount} />

                <Text style={styles.sectionTitle}>⚡ Quick Actions</Text>
                <View style={styles.grid}>
                    {QUICK_ACTIONS.map((action) => (
                        <QuickActionCard
                            key={action.id}
                            title={action.title}
                            icon={action.icon}
                            color={action.color}
                            onPress={() => router.push(action.route)}
                        />
                    ))}
                </View>

                <RecentSurveyList surveys={RECENT_SURVEYS} />
                <View style={styles.bottomPad} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    screen: {
        flex: 1,
    },
    content: {
        padding: Spacing.xl,
    },
    sectionTitle: {
        fontSize: FontSize.lg,
        fontWeight: FontWeight.bold,
        color: Colors.textPrimary,
        marginBottom: Spacing.md,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: Spacing.xl,
    },
    bottomPad: {
        height: 20,
    },
});
