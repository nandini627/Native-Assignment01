// ============================================================
// constants/theme.js
// Central design system — colors, spacing, typography, shadows
// ============================================================

export const Colors = {
    // Primary brand purple
    primary: '#8B5CF6',
    primaryDark: '#7C3AED',
    primaryLight: '#DDD6FE', // Accent

    // Accent / success
    success: '#8B5CF6',
    successLight: '#F3E8FF',

    // Warning amber
    warning: '#8B5CF6',
    warningLight: '#F3E8FF',

    // Danger red
    danger: '#8B5CF6',
    dangerLight: '#F3E8FF',

    // Neutral / Structural
    background: '#F8F5FF',
    surface: '#FFFFFF',
    border: '#E9D5FF',
    divider: '#E9D5FF',

    // Text
    textPrimary: '#2E1065',
    textSecondary: '#6D28D9', // Headings / subheadings
    textBody: '#4B5563',      // Body text if needed
    textMuted: '#6B7280',     // Captions
    textWhite: '#FFFFFF',

    // Tabs active / inactive
    tabActive: '#8B5CF6',
    tabInactive: '#9CA3AF',

    // Priority badge colors
    priorityHigh: '#6D28D9',
    priorityHighBg: '#EDE9FE',
    priorityMedium: '#8B5CF6',
    priorityMediumBg: '#F3E8FF',
    priorityLow: '#A78BFA',
    priorityLowBg: '#F5F3FF',

    // Gradient-like header overlay
    headerGradientStart: '#A78BFA', // Secondary logo color
    headerGradientEnd: '#8B5CF6',
};

export const Spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
};

export const FontSize = {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 30,
    display: 36,
};

export const FontWeight = {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    extraBold: '800',
};

// Rounded corners (16-20px based on prompt)
export const BorderRadius = {
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 30,
    full: 999,
};

// Soft shadows and elevation
export const Shadows = {
    sm: {
        elevation: 2,
        shadowColor: '#2E1065',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    md: {
        elevation: 4,
        shadowColor: '#2E1065',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 15,
    },
    lg: {
        elevation: 8,
        shadowColor: '#2E1065',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
    },
};
