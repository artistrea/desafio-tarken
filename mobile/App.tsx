import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { LoginPage } from "./src/pages/Login";
import { SessionContextProvider } from "./src/contexts/sessionContext/Provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient, api } from "client-api";

import Constants from "expo-constants";
const { expoConfig } = Constants;

const baseURL = expoConfig?.hostUri?.split(":")[0]
  ? `http://${expoConfig.hostUri.split(":")[0]}:3000`
  : `TODO: url de produção`;

api.defaults.baseURL = baseURL;

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="MyLibrary"
              component={Page}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Login"
              component={LoginPage}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SessionContextProvider>
    </QueryClientProvider>
  );
}

function Page() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
