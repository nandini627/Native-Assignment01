// ============================================================
// constants/theme.js
// Central design system — colors, spacing, typography, shadows
// Import this file wherever you need consistent styling
// ============================================================

export const Colors = {
    // Primary brand orange
    primary: '#F97316',
    primaryDark: '#C2410C',
    primaryLight: '#FFEDD5',

    // Accent / success -> orange shades
    success: '#F97316',
    successLight: '#FFEDD5',

    // Warning amber -> orange shades
    warning: '#F97316',
    warningLight: '#FFEDD5',

    // Danger red -> orange shades
    danger: '#F97316',
    dangerLight: '#FFEDD5',

    // Neutral grays
    background: '#FAFAFA',
    surface: '#FFFFFF',
    border: '#E5E7EB',
    divider: '#FAFAFA',

    // Text
    textPrimary: '#171717',
    textSecondary: '#525252',
    textMuted: '#A3A3A3',
    textWhite: '#FFFFFF',

    // Tabs active / inactive
    tabActive: '#F97316',
    tabInactive: '#A3A3A3',

    // Priority badge colors
    priorityHigh: '#F97316',
    priorityHighBg: '#FFEDD5',
    priorityMedium: '#F97316',
    priorityMediumBg: '#FFEDD5',
    priorityLow: '#F97316',
    priorityLowBg: '#FFEDD5',

    // Gradient-like header overlay
    headerGradientStart: '#F97316',
    headerGradientEnd: '#F97316',
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
    lg: 17,
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

export const BorderRadius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    full: 999,
};

// Reusable card shadow (Android elevation + iOS shadow)
export const Shadows = {
    sm: {
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
    },
    md: {
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },
    lg: {
        elevation: 10,
        shadowColor: '#F97316',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
    },
};
