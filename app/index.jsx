import { Redirect } from 'expo-router';

// Root redirect to map base '/' into our tabs drawer structure
export default function Index() {
    return <Redirect href="/(tabs)" />;
}
