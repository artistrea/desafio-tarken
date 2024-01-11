import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginPage } from "./src/pages/Login";
import { SessionContextProvider } from "./src/contexts/sessionContext/Provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient, api } from "client-api";

import Constants from "expo-constants";
import { MyLibraryPage } from "./src/pages/MyLibrary";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { AudioContextProvider } from "./src/contexts/audioContext/Provider";
const { expoConfig } = Constants;

const baseURL = expoConfig?.hostUri?.split(":")[0]
  ? `http://${expoConfig.hostUri.split(":")[0]}:3000`
  : `TODO: url de produção`;

api.defaults.baseURL = baseURL;

const Stack = createNativeStackNavigator();

export default gestureHandlerRootHOC(App);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider>
        <AudioContextProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="MyLibrary"
                component={MyLibraryPage}
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
        </AudioContextProvider>
      </SessionContextProvider>
    </QueryClientProvider>
  );
}
