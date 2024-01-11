import { View, useWindowDimensions, Image } from "react-native";
import { Appbar, Button, Icon, Text } from "react-native-paper";
import { useSessionContext } from "../contexts/sessionContext/use";
import { useEffect, useState } from "react";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLibraryQuery } from "client-api";
import Carousel from "react-native-reanimated-carousel";
import { ScrollView } from "react-native-gesture-handler";

export function MyLibraryPage({
  navigation,
}: NativeStackScreenProps<any, "MyLibrary">) {
  const { logout, session } = useSessionContext();

  const { data: library } = useLibraryQuery();

  useEffect(() => {
    if (!session) navigation.replace("Login");
  }, [session, navigation]);
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentMovie = library?.[currentIndex];

  const [isRecording, setIsRecording] = useState(false);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="My Library" />
        <Appbar.Action icon="magnify" onPress={() => {}} />

        <Appbar.Action
          icon="logout"
          color="red"
          onPress={() => {
            logout();
          }}
        />
      </Appbar.Header>
      <ScrollView
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#eee",
          height: "100%",
        }}
      >
        <View style={{ flex: 1 }}>
          <Carousel
            loop
            width={width}
            mode="parallax"
            snapEnabled
            height={550}
            pagingEnabled={false}
            data={library || []}
            scrollAnimationDuration={1000}
            onSnapToItem={setCurrentIndex}
            renderItem={({ item: { poster } }) => (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: poster }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 16,
                    display: "flex",
                    margin: "auto",
                  }}
                />
              </View>
            )}
          />

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
              gap: 4,
            }}
          >
            <Text
              variant="titleLarge"
              style={{ fontWeight: "bold", paddingHorizontal: 8 }}
            >
              {currentMovie?.title}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Icon source="star" size={24} color="#FCC419" />
              <Text>{currentMovie?.rating}</Text>
            </View>
            <View
              style={{
                position: "relative",
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                onPressIn={() => {
                  setIsRecording(true);
                }}
                onPressOut={() => {
                  setIsRecording(false);
                }}
                icon="microphone-outline"
                style={{
                  display: "flex",
                  backgroundColor: "#6CD3AE",
                  marginVertical: 18,
                  zIndex: 999,
                  minWidth: 0,
                }}
                labelStyle={{
                  marginHorizontal: 0,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  marginVertical: 0,
                  fontSize: 32,
                }}
              >
                {""}
              </Button>
              {isRecording && (
                <View
                  style={{
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    padding: 20,
                    gap: 20,
                    zIndex: 99,
                    backgroundColor: "rgba(18, 21, 61, 0.9)",
                    top: -100,
                    bottom: 0,
                    left: 20,
                    right: 20,
                    borderRadius: 26,
                  }}
                >
                  <Text style={{ color: "white" }}>Keep Holding to Record</Text>
                  <Icon source="record" size={32} color="red" />
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
