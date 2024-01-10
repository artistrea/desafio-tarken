import { View } from "react-native";
import { Button } from "react-native-paper";
import { useSessionContext } from "../contexts/sessionContext/use";
import { useEffect } from "react";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

export function MyLibraryPage({
  navigation,
}: NativeStackScreenProps<any, "MyLibrary">) {
  const { logout, session } = useSessionContext();

  useEffect(() => {
    if (!session) navigation.replace("Login");
  }, [session, navigation]);

  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <Button
        onPress={() => {
          logout();
        }}
      >
        Sair
      </Button>
    </View>
  );
}
