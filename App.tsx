import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <AppNavigator />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
