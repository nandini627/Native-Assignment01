// ============================================================
// data/studentData.js
// Static data for student details and seed surveys
// Keep business data separate from UI components
// ============================================================

// Student / developer info shown on Dashboard
export const STUDENT = {
    name: 'Nandini Prajapati',
    enrollment: '220103040001',
    course: 'B.E. Computer Engineering',
    college: 'LDRP Institute of Technology',
    subject: 'React Native (Expo SDK 54)',
};

// Seed survey records for the "Recent Surveys" section
export const RECENT_SURVEYS = [
    {
        id: '1',
        siteName: 'ABC Construction Site',
        clientName: 'Reliance Ltd.',
        priority: 'High',
        date: '18-07-2026',
        status: 'Completed',
    },
    {
        id: '2',
        siteName: 'XYZ Factory Unit',
        clientName: 'Tata Motors',
        priority: 'Medium',
        date: '17-07-2026',
        status: 'Pending',
    },
    {
        id: '3',
        siteName: 'Metro Rail Corridor',
        clientName: 'L&T Infrastructure',
        priority: 'Low',
        date: '16-07-2026',
        status: 'Completed',
    },
];

// Quick-action cards shown on the dashboard
export const QUICK_ACTIONS = [
    { id: '1', title: 'New Survey', icon: '📝', route: '/survey', color: '#F97316' },
    { id: '2', title: 'Camera', icon: '📷', route: '/camera', color: '#F97316' },
    { id: '3', title: 'Location', icon: '📍', route: '/location', color: '#F97316' },
    { id: '4', title: 'Contacts', icon: '👥', route: '/contacts', color: '#F97316' },
];
